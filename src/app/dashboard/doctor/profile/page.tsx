import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ProfileForm from "@/components/ProfileForm"; 
import { UserCircleIcon, IdentificationIcon } from "@heroicons/react/24/outline";

export default async function DoctorProfilePage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "DOCTOR") {
    redirect("/dashboard");
  }

  const profile = await prisma.doctorProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!profile) {
    return <div>Պրոֆիլը չի գտնվել: Խնդրում ենք կապվել ադմինիստրատորի հետ:</div>;
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen text-black">
      <div className="max-w-3xl mx-auto">
        
        <div className="flex items-center space-x-4 mb-8">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200">
            <UserCircleIcon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Իմ Պրոֆիլը</h1>
            <p className="text-gray-500 mt-1">Կառավարեք ձեր մասնագիտական տվյալները և փաստաթղթերը:</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10 text-black">
            <div className="flex items-center space-x-2 mb-6 text-blue-600">
              <IdentificationIcon className="h-5 w-5" />
              <h2 className="font-bold uppercase tracking-wider text-sm">Մասնագիտական տվյալներ</h2>
            </div>

            <ProfileForm doctor={profile} />
          </div>

          <div className={`p-4 rounded-2xl border flex items-center justify-between ${
            profile.isVerified 
              ? "bg-green-50 border-green-100 text-green-700" 
              : "bg-amber-50 border-amber-100 text-amber-700"
          }`}>
            <div className="flex items-center space-x-3">
                <div className={`h-2 w-2 rounded-full ${profile.isVerified ? "bg-green-500" : "bg-amber-500 animate-pulse"}`} />
                <span className="text-sm font-medium">
                    Կարգավիճակ՝ {profile.isVerified ? "Հաստատված բժիշկ" : "Սպասում է հաստատման"}
                </span>
            </div>
            {!profile.isVerified && (
                <span className="text-xs italic opacity-75">Ադմինիստրացիան կստուգի ձեր դիպլոմը</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}