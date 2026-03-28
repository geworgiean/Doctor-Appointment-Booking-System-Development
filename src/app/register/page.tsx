"use client";

import AuthLayout from "@/components/AuthLayout";
import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";

export const dynamic = "force-dynamic";
export default function RegisterPage() {
  return (
    <AuthLayout 
      title="Ստեղծել հաշիվ" 
      subtitle="Գրանցվեք և օգտագործեք հերթագրման MedBooking համակարգի բոլոր հնարավորությունները:"
    >
      <div className="space-y-6">
        <RegisterForm />
        <div className="text-center text-sm text-gray-600">
          Արդեն ունե՞ք հաշիվ:{" "}
          <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
            Մուտք գործել
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}