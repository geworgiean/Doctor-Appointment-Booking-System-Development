import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CancelButton from "@/components/CancelButton";
import { 
  CalendarIcon, 
  ClockIcon, 
  UserGroupIcon, 
  CheckCircleIcon,
  UserCircleIcon 
} from "@heroicons/react/24/outline";
import StatusButton from "@/components/StatusButton";
import Link from "next/link";

export default async function DoctorDashboard() {
    const session = await auth();

    if (!session?.user?.id) {
        redirect("/login");
    }

    if (session.user.role !== "DOCTOR") {
        redirect("/dashboard");
    }

    const doctorId = session.user.id;

    const appointments = await prisma.appointment.findMany({
        where: {
            doctorId: doctorId,
            status: "CONFIRMED",
            date: { gte: new Date() },
        },
        include: {
            patient: { select: { name: true, email: true } },
        },
        orderBy: { date: "asc" },
    });

    const stats = [
        { 
            name: 'Այսօրվա այցեր', 
            value: appointments.filter(app => new Date(app.date).toDateString() === new Date().toDateString()).length, 
            icon: CalendarIcon, 
            color: 'text-blue-600', 
            bg: 'bg-blue-100' 
        },
        { 
            name: 'Պացիենտներ', 
            value: new Set(appointments.map(a => a.patientId)).size, 
            icon: UserGroupIcon, 
            color: 'text-green-600', 
            bg: 'bg-green-100' 
        },
        { 
            name: 'Հաստատված', 
            value: appointments.length, 
            icon: CheckCircleIcon, 
            color: 'text-purple-600', 
            bg: 'bg-purple-100' 
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 text-black">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Բժշկի կառավարման վահանակ</h1>
                        <p className="text-gray-500 mt-1">Բարի գալուստ, {session.user.name}: Ահա ձեր պլանավորված այցերը:</p>
                    </div>

                    <Link 
                        href="/dashboard/doctor/profile" 
                        className="flex items-center space-x-2 bg-white border border-gray-200 px-5 py-2.5 rounded-2xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all text-sm font-bold text-gray-700"
                    >
                        <UserCircleIcon className="h-5 w-5 text-blue-600" />
                        <span>Իմ Պրոֆիլը</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {stats.map((item) => (
                        <div key={item.name} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                            <div className={`${item.bg} p-3 rounded-xl`}>
                                <item.icon className={`h-6 w-6 ${item.color}`} />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">{item.name}</p>
                                <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-800">Առաջիկա այցելություններ</h2>
                        <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                            Ընթացիկ շաբաթ
                        </span>
                    </div>

                    {appointments.length === 0 ? (
                        <div className="text-center py-20 px-4">
                            <div className="bg-gray-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CalendarIcon className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-gray-900 font-semibold italic">Դեռևս պլանավորված այցեր չկան</h3>
                            <p className="text-gray-400 text-sm mt-1">Երբ նոր պացիենտներ գրանցվեն, նրանք կհայտնվեն այստեղ:</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase font-bold tracking-widest">
                                        <th className="px-6 py-4">Պացիենտ</th>
                                        <th className="px-6 py-4">Ամսաթիվ / Ժամ</th>
                                        <th className="px-6 py-4">Կարգավիճակ</th>
                                        <th className="px-6 py-4 text-right">Գործողություն</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {appointments.map((app) => (
                                        <tr key={app.id} className="hover:bg-blue-50/30 transition-colors">
                                            <td className="px-6 py-5">
                                                <div className="flex items-center space-x-3">
                                                    <div className="h-10 w-10 rounded-full bg-linear-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                                                        {app.patient.name?.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900">{app.patient.name}</div>
                                                        <div className="text-xs text-gray-400">{app.patient.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-semibold text-gray-700 flex items-center">
                                                        <CalendarIcon className="h-3.5 w-3.5 mr-1.5 text-blue-500" />
                                                        {format(new Date(app.date), "dd MMMM, yyyy")}
                                                    </span>
                                                    <span className="text-xs text-gray-400 flex items-center mt-1">
                                                        <ClockIcon className="h-3.5 w-3.5 mr-1.5 text-orange-400" />
                                                        {format(new Date(app.date), "HH:mm")}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-sm">
                                                <div className="flex items-center space-x-3">
                                                    <StatusButton appId={app.id} />
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right space-x-2">
                                                <button className="text-gray-400 hover:text-blue-600 transition-colors text-xs font-medium">
                                                    Մանրամասն
                                                </button>
                                                <CancelButton id={app.id} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}