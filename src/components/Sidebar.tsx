"use client"

import Link from 'next/link';
import { 
  HomeIcon, 
  CalendarIcon, 
  UserGroupIcon, 
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  UserIcon,
  ClipboardDocumentListIcon
} from "@heroicons/react/24/outline";
import SignOutButton from "./SignOutButton";
import { usePathname } from 'next/navigation';

interface SidebarProps {
  role: string;
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const doctorNav = [
  { name: 'Գլխավոր', href: '/dashboard/doctor', icon: HomeIcon },
  { name: 'Իմ այցելությունները', href: '/dashboard/doctor/appointments', icon: CalendarIcon },
  { name: 'Պացիենտներ', href: '/dashboard/doctor/patients', icon: UserGroupIcon },
  { name: 'Անձնական էջ', href: '/dashboard/doctor/profile', icon: UserIcon },
];

const patientNav = [
    { name: 'Իմ էջը', href: '/dashboard/patient', icon: HomeIcon },
    { name: 'Բժիշկների ցանկ', href: '/dashboard/patient/doctors', icon: ClipboardDocumentListIcon },
    { name: 'Իմ հերթագրումները', href: '/dashboard/patient/appointments', icon: CalendarIcon },
    { name: 'Անձնական էջ', href: '/dashboard/patient/profile', icon: UserIcon },
  ];

  const navigation = role === "DOCTOR" ? doctorNav : patientNav;

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200 shadow-sm">
      <div className="flex flex-col grow pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center shrink-0 px-6 mb-10">
          <span className="text-2xl font-black text-blue-600 tracking-tight italic">
            MedBooking
          </span>
        </div>
        
        <nav className="mt-2 flex-1 px-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                  isActive 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 shrink-0 ${isActive ? "text-blue-600" : "text-gray-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-50 bg-gray-50/50">
        <SignOutButton />
      </div>
    </div>
  );
}