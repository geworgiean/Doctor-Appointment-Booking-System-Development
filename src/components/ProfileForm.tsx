"use client";

import { useState } from "react";
import { updateDoctorProfile } from "@/actions/profile";

export default function ProfileForm({ doctor }: { doctor: any }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      specialty: formData.get("specialty"),
      bio: formData.get("bio"),
    };

    const res = await updateDoctorProfile(doctor.id, data);
    
    if (res.success) {
      setMessage("Տվյալները հաջողությամբ թարմացվեցին:");
    } else {
      setMessage("Սխալ տեղի ունեցավ:");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border">
      <div>
        <label className="block text-sm font-medium text-gray-700">Անուն Ազգանուն</label>
        <input
          name="name"
          defaultValue={doctor?.name}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Մասնագիտացում</label>
        <input
          name="specialty"
          defaultValue={doctor?.doctorProfile?.specialty}
          placeholder="Օրինակ՝ Ստոմատոլոգ"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Կենսագրություն</label>
        <textarea
          name="bio"
          rows={4}
          defaultValue={doctor?.doctorProfile?.bio}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      {message && (
        <p className={`text-sm ${message.includes("հաջողությամբ") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {loading ? "Պահպանվում է..." : "Պահպանել փոփոխությունները"}
      </button>
    </form>
  );
}