import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { format } from "date-fns";
import CancelButton from "@/components/CancelButton"; // Հիմա կսարքենք սա

export default async function PatientAppointmentsPage() {
  const session = await auth();

  const appointments = await prisma.appointment.findMany({
    where: { 
      patientId: session?.user?.id,
      status: { in: ["CONFIRMED", "PENDING"] } // Ցույց տանք միայն ակտիվները
    },
    include: {
      doctor: true, // Սա այն Many-to-Many կապն է Prisma-ում
    },
    orderBy: { date: "asc" }
  });

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Իմ ամրագրումները</h1>
      
      <div className="grid gap-4">
        {appointments.length === 0 ? (
          <p className="text-gray-500 italic">Դուք դեռ չունեք ակտիվ ամրագրումներ:</p>
        ) : (
          appointments.map((app) => (
            <div key={app.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
              <div>
                <p className="text-sm text-blue-600 font-bold uppercase tracking-wider mb-1">
                  {format(new Date(app.date), "dd MMMM, yyyy")}
                </p>
                <h3 className="text-lg font-bold text-gray-900">բժիշկ՝ {app.doctor.name}</h3>
                <p className="text-gray-500">Ժամը՝ {format(new Date(app.date), "HH:mm")}</p>
              </div>
              
              <CancelButton id={app.id} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}