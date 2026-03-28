import prisma from "@/lib/prisma";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/outline";

export default async function DoctorsListPage() {
  const doctors = await prisma.user.findMany({
    where: {
      role: "DOCTOR",
    },
    include: {
      doctorProfile: true,
    },
  });

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-8 text-gray-900">Մեր բժիշկները</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-blue-50 p-3 rounded-full">
                <UserIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">{doctor.name}</h3>
                <p className="text-sm text-blue-600 font-medium">
                  {doctor.doctorProfile?.specialty || "Ընդհանուր բժիշկ"}
                </p>
              </div>
            </div>
            <Link 
                href={`/book/${doctor.id}`}
                className="block text-center w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                >
                Ամրագրել այց
                </Link>
          </div>
        ))}
        
        {doctors.length === 0 && (
          <p className="text-gray-500 italic">Այս պահին գրանցված բժիշկներ չկան։</p>
        )}
      </div>
    </div>
  );
}