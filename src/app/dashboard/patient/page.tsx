import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import {
        CalendarIcon, 
        UserIcon, 
        MagnifyingGlassIcon,
        ClockIcon
        } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function PatientDashboard() {
    const session = await auth();

    if(!session?.user?.id) {
        redirect("/login")
    }

    const myAppointments = await prisma.appointment.findMany({
        where: {
            patientId: session.user.id,
            status: "CONFIRMED",
        },
        include: {
            doctor: true,
        },
        orderBy: {
            date: "asc",
        },
    });

    const doctors = await prisma.user.findMany({
        where: { role: "DOCTOR" },
        include: { doctorProfile: true },
    });

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <header className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Բարի գալուս, {session.user.name}</h1>
                    <p className="text-gray-500">Կառավարեք ձեր այցելությունները և գտեք մասնագետների։</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <CalendarIcon className="h-6 w-6 mr-2 text-blue-600" />
                                Իմ հաստատված հերթերը
                            </h2>

                            <div className="grid gap-4">
                                {myAppointments.length === 0 ? (
                                    <div className="bg-white p-8 rounded-2xl border border-dashed border-gray-300 text-center text-gray-500">
                                        Դուք դեռ չունեք ակտիվ հերթագրումներ։
                                    </div>
                                ) : (
                                    myAppointments.map((app) => (
                                        <div key={app.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow">
                                            <div className="flex items-center space-x-4">
                                                <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                                                    <UserIcon className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-900">դոկտ. {app.doctor.name}</p>
                                                    <p className="text-sm text-gray-500 flex items-center">
                                                        <ClockIcon className="h-4 w-4 mr-1" />
                                                        {format(new Date(app.date), "dd MMMM, HH:mm")}
                                                    </p>
                                                </div>
                                            </div>                                            
                                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                                Հաստատված
                                            </span>
                                        </div>
                                    ))
                                )}
                            </div>
                        </section>
                    </div>

                    <div className="space-y-6">
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                                <MagnifyingGlassIcon className="h-6 w-6 mr-2 text-blue-600" />
                                Գտնել բժիշկ
                            </h2>
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="divide-y divide-gray-100">
                                    {doctors.map((doctor) => (
                                        <div key={doctor.id} className="p-4 hover:bg-gray-50 transition-colors group">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                        {doctor.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {doctor.doctorProfile?.specialty || "Ընդհանուր բժիշկ"}
                                                    </p>
                                                </div>
                                                <Link
                                                    href={`/book/${doctor.id}`}
                                                    className="text-xs bg-blue-600 text-white px-3 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors"
                                                >
                                                    Գրանցվել
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}