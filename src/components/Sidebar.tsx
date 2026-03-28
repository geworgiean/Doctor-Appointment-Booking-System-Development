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
  { name: 'Պրոֆիլ', href: '/dashboard/doctor/profile', icon: UserIcon },
];

const patientNav = [
    { name: 'Իմ էջը', href: '/dashboard/patient', icon: HomeIcon },
    { name: 'Իմ հերթագրումները', href: '/dashboard/patient/appointments', icon: CalendarIcon },
    { name: 'Բժիշկների ցանկ', href: '/dashboard/patient/search', icon: ClipboardDocumentListIcon },
    { name: 'Կարգավորումներ', href: '/dashboard/patient/settings', icon: UserIcon },
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
        
        <nav className="mt-2 flex-1 px-4 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${isActive ? "text-white" : "text-gray-400"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-100">
        <SignOutButton />
      </div>
    </div>
  );
}