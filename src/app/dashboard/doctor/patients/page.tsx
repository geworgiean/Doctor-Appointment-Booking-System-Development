import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export default async function DoctorPatientsPage() {
  const session = await auth();

  const appointments = await prisma.appointment.findMany({
    where: { doctorId: session?.user?.id },
    include: { patient: true },
    distinct: ['patientId'], 
  });

  const patients = appointments.map(app => app.patient);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 italic text-blue-600">Պացիենտների ցուցակ</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {patients.map((patient) => (
          <div key={patient.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 font-bold text-xl">
              {patient.name?.[0]}
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{patient.name}</h3>
              <p className="text-sm text-gray-500">{patient.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}