"use client";

import { useState } from "react";
import { createAppointment } from "@/actions/booking";
import { useRouter } from "next/navigation";

export default function BookingForm({ doctorId, patientId }: { doctorId: string, patientId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setLoading(true);
  setError("");

  const formData = new FormData(e.currentTarget);
  const dateOnly = formData.get("dateOnly") as string; 
  const timeOnly = formData.get("timeOnly") as string; 

  const fullDateString = `${dateOnly}T${timeOnly}:00`; 
  
  const submissionData = new FormData();
  submissionData.append("doctorId", doctorId);
  submissionData.append("patientId", patientId);
  submissionData.append("date", fullDateString);

  const result = await createAppointment(submissionData);

  if (result.success) {
    router.push("/dashboard/patient");
    router.refresh();
  } else {
    setError(result.error || "Տեղի է ունեցել սխալ");
    setLoading(false);
  }
}

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">{error}</div>}
      
      <input type="hidden" name="doctorId" value={doctorId} />
      <input type="hidden" name="patientId" value={patientId} />

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Ընտրեք օրը</label>
        <input 
          type="date" 
          name="dateOnly" 
          required 
          className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" 
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">Ընտրեք ժամը</label>
        <select 
          name="timeOnly" 
          required 
          className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          {timeSlots.map(time => (
            <option key={time} value={time}>{time}</option>
          ))}
        </select>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
      >
        {loading ? "Ամրագրվում է..." : "Հաստատել ամրագրումը"}
      </button>
    </form>
  );
}