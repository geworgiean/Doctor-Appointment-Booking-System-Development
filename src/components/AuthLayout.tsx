import { AcademicCapIcon, UserIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
      <Link 
        href="/" 
        className="absolute top-8 left-8 flex items-center text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-2" />
        Գլխավոր էջ
      </Link>
      <div className="bg-white rounded-3xl shadow-2xl flex max-w-5xl w-full overflow-hidden">
        {/* Left Side: Illustration & Branding */}
        <div className="hidden md:flex md:w-1/2 bg-blue-600 p-12 text-white flex-col justify-between">
          <div>
            <div className="text-3xl font-bold italic mb-6">MedBooking</div>
            <h1 className="text-4xl font-extrabold leading-tight mb-4">
              {title}
            </h1>
            <p className="text-blue-100 text-lg">
              {subtitle}
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center -space-x-3">
              <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center border-4 border-white">
                <UserIcon className="h-6 w-6 text-white" />
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center border-4 border-white">
                <AcademicCapIcon className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-blue-100 text-sm">
              Միացեք հազարավոր բժիշկներին և պացիենտներին:
            </p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full md:w-1/2 p-10 md:p-16">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">MedBooking</h2>
            <p className="text-gray-600">Հերթագրման ժամանակակից համակարգ:</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}