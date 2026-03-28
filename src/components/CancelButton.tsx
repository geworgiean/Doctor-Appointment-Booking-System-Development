"use client";

import { cancelAppointment } from "@/actions/appointment";
import { useTransition } from "react";

export default function CancelButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (confirm("Վստա՞հ եք, որ ուզում եք չեղարկել:")) {
          startTransition(async () => {
            await cancelAppointment(id);
          });
        }
      }}
      disabled={isPending}
      className="text-red-600 hover:text-red-800 font-medium disabled:opacity-50"
    >
      {isPending ? "Չեղարկվում է..." : "Չեղարկել"}
    </button>
  );
}