"use client"
import { useState, useEffect } from "react"
import { getAvailableSlots, bookAppointment } from "@/actions/appointment"

export default function TimePicker({ doctorId, patientId }: { doctorId: string, patientId: string }) {
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [selectedDate] = useState(new Date());

    useEffect(() => {
        const loadSlots = async () => {
            const slots = await getAvailableSlots(doctorId, selectedDate);
            setAvailableSlots(slots);
        };
        loadSlots();
    }, [doctorId, selectedDate]);

    const handleBooking = async ( time: string) => {
        const [hours, minutes] = time.split(":").map(Number);
        const dateToBook = new Date(selectedDate);
        dateToBook.setHours(hours, minutes, 0, 0);

        const res = await bookAppointment(doctorId, patientId, dateToBook);
        if (res.success) {
            alert("Հաջողությամբ ամրագրվեց");
            setAvailableSlots(prev => prev.filter(s => s !== time));
        }
    };

    return (
        <div className="p-4 border rounded-lg shadow">
            <h3 className="text-lg font-bold mb-4">Ընտրեք ազատ ժամ</h3>
            <div className="grid grid-cols-4 gap-2">
                {availableSlots.length > 0 ? (
                    availableSlots.map(time => (
                        <button
                            key={time}
                            onClick={() => handleBooking(time)}
                            className="p-2 bg-green-100 hover:bg-green-500 hover:text-white border border-green-500 rounded transition"
                        >
                            {time}
                        </button>
                    ))
                ) : (
                    <p className="col-span-4 text-gray-500">Այս օրվա համար ազատ ժամեր չկան:</p>
                )}
            </div>
        </div>
    );
}