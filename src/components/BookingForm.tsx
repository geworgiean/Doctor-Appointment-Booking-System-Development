"use client";

import { useState, useEffect } from "react";
import { createAppointment, getBusySlots } from "@/actions/booking";
import { useRouter } from "next/navigation";

export default function BookingForm({ doctorId, patientId }: { doctorId: string, patientId: string }) {
  const [date, setDate] = useState("");
  const [busySlots, setBusySlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const allSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00"];

  useEffect(() => {
    if (date) {
      getBusySlots(doctorId, date).then(setBusySlots);
    }
  }, [date, doctorId]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const selectedTime = formData.get("timeOnly") as string;
    
    const submissionData = new FormData();
    submissionData.append("doctorId", doctorId);
    submissionData.append("patientId", patientId);
    submissionData.append("date", `${date}T${selectedTime}:00`);

    const result = await createAppointment(submissionData);
    if (result.success) {
      router.push("/dashboard/patient");
      router.refresh();
    } else {
      setError(result.error || "Սխալ");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">{error}</div>}
      
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">1. Ընտրեք օրը</label>
        <input 
          type="date" 
          required 
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
          className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" 
        />
      </div>

      {date && (
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">2. Ընտրեք ազատ ժամը</label>
          <div className="grid grid-cols-3 gap-2">
            {allSlots.map(time => {
              const isBusy = busySlots.includes(time);
              return (
                <label key={time} className={`relative block`}>
                  <input 
                    type="radio" 
                    name="timeOnly" 
                    value={time} 
                    disabled={isBusy}
                    required
                    className="peer sr-only" 
                  />
                  <div className={`text-center py-3 rounded-xl border font-semibold cursor-pointer transition-all
                    ${isBusy 
                      ? "bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed" 
                      : "border-gray-200 peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 hover:border-blue-300"
                    }`}>
                    {time}
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      )}

      <button 
        type="submit" 
        disabled={loading || !date}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:opacity-50 mt-4"
      >
        {loading ? "Ամրագրվում է..." : "Հաստատել այցը"}
      </button>
    </form>
  );
}