"use client"

import { cancelAppointment } from "@/actions/appointment"
import { useTransition } from "react"

export default function CancelButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition()

    const handleCancel = () => {
        if (confirm("Վստա՞հ եք, որ ուզում եք չեղարկել այս այցը:")) {
            startTransition(async () => {
                await cancelAppointment(id)
            })
        }
    }

    return (
        <button
            onClick={handleCancel}
            disabled={isPending}
            className="text-red-500 hover:text-red-700 text-sm font-medium disabled:opacity-50"
        >
            {isPending ? "Չեղարկվում է..." : "Չեղարկել"}
        </button>
    )
}