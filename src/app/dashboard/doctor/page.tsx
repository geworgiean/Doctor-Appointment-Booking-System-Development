import prisma from "@/lib/prisma";
import { format } from "date-fns";
import { Appointment, User } from "@prisma/client";
import CancelButton from "@/components/CancelButton";

type AppointmentWithPatient = Appointment & {
  patient: User;
};

export default async function DoctorDashboard({ 
    searchParams 
}: { 
    searchParams: { id: string } 
}) {
    const doctorId = searchParams.id;

    if (!doctorId) {
        return <div className="p-8 text-red-500">Բժշկի ID-ն բացակայում է։</div>;
    }

    const appointments = await prisma.appointment.findMany({
        where: {
            doctorId: doctorId,
            status: "CONFIRMED",
            date: {
                gte: new Date(),
            },
        },
        include: {
            patient: {
                select: {
                    name: true,
                    email: true,
                },
            },
        },
        orderBy: {
            date: "asc",
        },
    }) as AppointmentWithPatient[];

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Իմ Այցելությունները</h1>
            
            {appointments.length === 0 ? (
                <p className="text-gray-500 text-center py-10 border rounded-lg">
                    Դեռևս պլանավորված այցեր չկան։
                </p>
            ) : (
                <div className="overflow-x-auto border rounded-lg shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Պացիենտ</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ամսաթիվ</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ժամ</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Գործողություն</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {appointments.map((app) => (
                                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="font-medium text-gray-900">{app.patient.name}</div>
                                        <div className="text-sm text-gray-500">{app.patient.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                        {format(new Date(app.date), "dd/MM/yyyy")}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
                                        {format(new Date(app.date), "HH:mm")}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                                        <button className="text-red-600 hover:text-red-800 font-medium hover:underline">
                                            Չեղարկել
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <CancelButton id={app.id} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}