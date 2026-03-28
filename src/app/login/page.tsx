import AuthLayout from "@/components/AuthLayout";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <AuthLayout 
      title="Բարի գալուստ" 
      subtitle="Մուտք գործեք ձեր անձնական էջ՝ այցելությունները և հերթերը կառավարելու համար:"
    >
      <div className="space-y-6">
        <LoginForm />
        <div className="text-center text-sm text-gray-600">
          Դեռ չեք գրանցվե՞լ:{" "}
          <Link href="/register" className="font-semibold text-blue-600 hover:text-blue-700">
            Ստեղծել հաշիվ
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}