"use client";

import { cancelAppointment } from "@/actions/booking";
import { useState } from "react";

export default function CancelButton({ appId }: { appId: string }) {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    if (!confirm("Վստա՞հ եք, որ ուզում եք չեղարկել այցը:")) return;
    setLoading(true);
    await cancelAppointment(appId);
    setLoading(false);
  };

  return (
    <button
      onClick={handleCancel}
      disabled={loading}
      className="text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl text-sm font-bold transition-all border border-transparent hover:border-red-100"
    >
      {loading ? "..." : "Չեղարկել"}
    </button>
  );
}