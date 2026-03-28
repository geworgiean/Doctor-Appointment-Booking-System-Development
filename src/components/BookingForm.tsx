"use client"

import { useState, useEffect } from "react"
import { getAvailableSlots, bookAppointment } from "@/actions/appointment"

export default function BookingForm({ doctorId, patientId }: { doctorId: string, patientId: string }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [slots, setSlots] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadSlots() {
      setLoading(true)
      const available = await getAvailableSlots(doctorId, new Date(date))
      setSlots(available)
      setLoading(false)
    }
    loadSlots()
  }, [date, doctorId])

  const handleBook = async (time: string) => {
    const appointmentDate = new Date(`${date}T${time}:00Z`)
    const res = await bookAppointment(doctorId, patientId, appointmentDate)
    
    if (res.success) {
      alert("Ամրագրումը հաջողվեց:")
      window.location.reload() 
    } else {
      alert(res.error)
    }
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white">
      <h2 className="text-xl font-bold mb-4">Ամրագրել այց</h2>
      <input 
        type="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />

      {loading ? <p>Բեռնվում է...</p> : (
        <div className="grid grid-cols-4 gap-2">
          {slots.length > 0 ? slots.map(slot => (
            <button
              key={slot}
              onClick={() => handleBook(slot)}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
            >
              {slot}
            </button>
          )) : <p className="col-span-4 text-gray-500">Այս օրվա համար ազատ ժամեր չկան:</p>}
        </div>
      )}
    </div>
  )
}