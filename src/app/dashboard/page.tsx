// src/app/dashboard/page.tsx
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Բարի գալուստ, {session?.user?.name || "Օգտատեր"} 👋
      </h1>
      <p className="text-gray-500 mb-8">
        Սա ձեր անձնական կառավարման վահանակն է:
      </p>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 max-w-2xl">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Ձեր կարգավիճակը՝ <span className="text-blue-600">{session?.user?.role}</span>
        </h2>
        
        <div className="text-gray-600">
          {session?.user?.role === "DOCTOR" && (
            <p>Որպես բժիշկ՝ ձախ մենյուից դուք կարող եք թարմացնել ձեր պրոֆիլը և կառավարել հերթագրված այցելությունները։</p>
          )}
          {session?.user?.role === "PATIENT" && (
            <p>Որպես պացիենտ՝ դուք կարող եք որոնել բժիշկների, գրանցվել ընդունելության և հետևել ձեր այցելությունների պատմությանը։</p>
          )}
          {session?.user?.role === "ADMIN" && (
            <p>Որպես ադմինիստրատոր՝ դուք ունեք համակարգի ամբողջական վերահսկողություն։</p>
          )}
        </div>
      </div>
    </div>
  );
}