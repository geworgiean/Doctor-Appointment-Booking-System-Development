"use client";

import { useState } from "react";
import { updateDoctorProfile } from "@/actions/profile";
import { supabase } from "@/lib/supabase";

export default function ProfileForm({ doctor }: { doctor: any }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${doctor.id}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('diplomas')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('diplomas')
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error) {
      console.error("Upload error:", error);
      return null;
    } finally {
      setUploading(false);
    }
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  const formData = new FormData(e.currentTarget);
  
  const fileInput = e.currentTarget.elements.namedItem('diploma') as HTMLInputElement;
  const file = fileInput?.files?.[0];

  let diplomaUrl = doctor?.doctorProfile?.diplomaUrl || "";

  if (file) {
    const uploadedUrl = await handleFileUpload(file);
    if (uploadedUrl) {
      diplomaUrl = uploadedUrl;
    }
  }

  formData.append("diplomaUrl", diplomaUrl);
  formData.delete("diploma");

  const res = await updateDoctorProfile(doctor.id, formData);

  if (res.success) {
    setMessage("Տվյալները հաջողությամբ թարմացվել են:");
  } else {
    setMessage(res.error || "Սխալ տեղի ունեցավ:");
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
          defaultValue={doctor?.doctorProfile?.specialty || ""}
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

      <div>
        <label className="block text-sm font-medium text-gray-700">Բժշկական Դիպլոմ (PDF)</label>
        <input
          type="file"
          name="diploma"
          accept=".pdf"
          className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {doctor?.doctorProfile?.diplomaUrl && (
          <p className="mt-2 text-xs text-green-600">Դիպլոմը արդեն վերբեռնված է:</p>
        )}
      </div>

      {message && (
        <p className={`text-sm ${message.includes("հաջողությամբ") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || uploading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {loading || uploading ? "Մշակվում է..." : "Պահպանել փոփոխությունները"}
      </button>
    </form>
  );
}