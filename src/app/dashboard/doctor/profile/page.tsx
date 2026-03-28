import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import CancelButton from "@/components/CancelButton";
import { 
  CalendarIcon, 
  UserGroupIcon, 
  ClockIcon 
} from "@heroicons/react/24/outline";
import SignOutButton from "@/components/SignOutButton";

export default async function DoctorDashboard() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const doctorId = session.user.id;

  const appointments = await prisma.appointment.findMany({
    where: {
      doctorId: doctorId,
      status: "CONFIRMED",
    },
    include: {
      patient: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  const totalPatients = new Set(appointments.map(a => a.patientId)).size;
  const todayAppointments = appointments.filter(app => 
    new Date(app.date).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Բարի գալուստ, {session.user.name}</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
              <CalendarIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Այսօրվա այցեր</p>
              <p className="text-2xl font-bold text-gray-900">{todayAppointments}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className="bg-green-100 p-3 rounded-xl text-green-600">
              <UserGroupIcon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Ընդհանուր պացիենտներ</p>
              <p className="text-2xl font-bold text-gray-900">{totalPatients}</p>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 font-bold text-lg">
            Առաջիկա այցելություններ
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
                <tr>
                  <th className="px-6 py-4">Պացիենտ</th>
                  <th className="px-6 py-4">Ամսաթիվ</th>
                  <th className="px-6 py-4 text-right">Գործողություն</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{app.patient.name}</div>
                      <div className="text-xs text-gray-500">{app.patient.email}</div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center text-gray-700">
                        <ClockIcon className="h-4 w-4 mr-1 text-blue-500" />
                        {format(new Date(app.date), "dd/MM/yyyy HH:mm")}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <CancelButton id={app.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {appointments.length === 0 && (
              <p className="p-10 text-center text-gray-500">Դեռևս այցելություններ չկան:</p>
            )}
            <div className="shrink-0 flex border-t border-gray-200 p-4">
              <SignOutButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}