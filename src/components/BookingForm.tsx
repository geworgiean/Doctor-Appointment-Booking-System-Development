"use client"
import { bookAppointment } from "@/actions/appointment"

export default function BookingForm({ doctorId, patientId }: { doctorId: string, patientId: string }) {

    const handleBook = async () => {
        const selectedDate = new Date("2026-03-30T10:00:00");

        const result = await bookAppointment(doctorId, patientId, selectedDate);

        if (result.success) {
            alert("Ամրագրվեց:");
        }   else {
            alert(result.error);
        }
    };

    return (
        <button
            onClick={handleBook}
            className="bg-blue-500 text-white p-2 rounded"
        >
            Ամրագրել ժամը 10:00-ին
        </button>
    );
}