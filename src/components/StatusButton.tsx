"use client";

import { useState } from "react";
import { updateAppointmentStatus } from "@/actions/booking";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function StatusButton({ appId }: { appId: string }) {
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    setLoading(true);
    await updateAppointmentStatus(appId, "COMPLETED");
    setLoading(false);
  };

  return (
    <button
      onClick={handleComplete}
      disabled={loading}
      className="flex items-center space-x-1 text-xs font-bold bg-green-50 text-green-700 px-3 py-2 rounded-lg hover:bg-green-100 transition-all disabled:opacity-50"
    >
      <CheckIcon className="h-4 w-4" />
      <span>{loading ? "..." : "Ավարտել"}</span>
    </button>
  );
}