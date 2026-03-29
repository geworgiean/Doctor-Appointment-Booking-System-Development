import Link from "next/link";
import { 
  UserIcon, 
  UserPlusIcon, 
  AcademicCapIcon 
} from "@heroicons/react/24/outline";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();

  if (session?.user.role === "DOCTOR") {
  redirect("/dashboard/doctor");
} else if (session?.user.role === "ADMIN") {
  redirect("/dashboard/admin");
}

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 to-white flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          MedBooking <span className="text-blue-600">Համակարգ</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Բարի գալուստ պրոֆեսիոնալ բժշկական հերթագրումների հարթակ։ 
          Խնդրում ենք ընտրել ձեր դերը՝ շարունակելու համար։
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100 hover:border-blue-300 transition-all transform hover:-translate-y-2 group">
          <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
            <UserIcon className="h-8 w-8 text-blue-600 group-hover:text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Ես Պացիենտ եմ</h2>
          <p className="text-gray-500 mb-8">
            Գտեք լավագույն բժիշկներին, ամրագրեք այցելություն և հետևեք ձեր հերթին իրական ժամանակում։
          </p>
          <div className="space-y-3">
            <Link href="/login" className="block w-full text-center bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors">
              Մուտք գործել
            </Link>
            <Link href="/register?role=PATIENT" className="block w-full text-center border-2 border-blue-100 text-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
              Գրանցվել
            </Link>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-100 hover:border-green-300 transition-all transform hover:-translate-y-2 group">
          <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
            <AcademicCapIcon className="h-8 w-8 text-green-600 group-hover:text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Ես Բժիշկ եմ</h2>
          <p className="text-gray-500 mb-8">
            Կառավարեք ձեր ժամանակացույցը, ընդունեք պացիենտներին և օգտագործեք հերթերի խելացի համակարգը։
          </p>
          <div className="space-y-3">
            <Link href="/login" className="block w-full text-center bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors">
              Մուտք գործել
            </Link>
            <Link href="/register?role=DOCTOR" className="block w-full text-center border-2 border-green-100 text-green-600 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors">
              Գրանցվել որպես բժիշկ
            </Link>
          </div>
        </div>

      </div>

      <div className="mt-16 text-gray-400 text-sm flex items-center">
        <UserPlusIcon className="h-5 w-5 mr-2" />
        Ավելի քան 1000+ բժիշկ և պացիենտ արդեն մեզ հետ են
      </div>
    </div>
  );
}