import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { UserCircleIcon, EnvelopeIcon, IdentificationIcon } from "@heroicons/react/24/outline";

export default async function PatientProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) return null;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">Իմ պրոֆիլը</h1>
        <p className="text-gray-500">Կառավարեք ձեր անձնական տվյալները և հաշվի կարգավորումները:</p>
      </header>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 space-y-8">
          
          <div className="flex items-center space-x-4">
            <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
              <UserCircleIcon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Անուն Ազգանուն</label>
              <p className="text-lg font-semibold text-gray-800">{user.name || "Նշված չէ"}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
              <EnvelopeIcon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Էլ. հասցե</label>
              <p className="text-lg font-semibold text-gray-800">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
              <IdentificationIcon className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">Կարգավիճակ</label>
              <span className="inline-flex mt-1 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Պացիենտ
              </span>
            </div>
          </div>

        </div>

        <div className="bg-gray-50 p-6 border-t border-gray-100 flex justify-end">
          <button className="bg-white border border-gray-200 text-gray-700 px-6 py-2 rounded-xl font-bold hover:bg-gray-100 transition-all text-sm">
            Խմբագրել տվյալները
          </button>
        </div>
      </div>
    </div>
  );
}