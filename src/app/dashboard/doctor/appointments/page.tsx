import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { format } from "date-fns";

export default async function DoctorAppointmentsPage() {
  const session = await auth();
  
  const appointments = await prisma.appointment.findMany({
    where: {
      doctorId: session?.user?.id,
      status: "CONFIRMED", 
    },
    include: {
      patient: true,
    },
    orderBy: { date: 'asc' }
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 italic text-blue-600">Իմ այցելությունները</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 uppercase text-xs font-bold text-gray-500">
            <tr>
              <th className="p-4">Պացիենտ</th>
              <th className="p-4">Ամսաթիվ</th>
              <th className="p-4">Ժամ</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app) => (
              <tr key={app.id} className="border-t hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium">{app.patient.name}</td>
                <td className="p-4">{format(new Date(app.date), "dd.MM.yyyy")}</td>
                <td className="p-4 text-blue-600 font-bold">{format(new Date(app.date), "HH:mm")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {appointments.length === 0 && (
          <p className="p-8 text-center text-gray-400 italic">Այսօր դեռ այցելություններ չկան:</p>
        )}
      </div>
    </div>
  );
}