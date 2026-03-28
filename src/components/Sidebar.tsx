import Link from 'next/link';
import { 
  HomeIcon, 
  CalendarIcon, 
  UserGroupIcon, 
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon 
} from "@heroicons/react/24/outline";

const navigation = [
  { name: 'Գլխավոր', href: '/dashboard/doctor', icon: HomeIcon },
  { name: 'Իմ այցելությունները', href: '/dashboard/doctor/appointments', icon: CalendarIcon },
  { name: 'Պացիենտներ', href: '/dashboard/doctor/patients', icon: UserGroupIcon },
  { name: 'Կարգավորումներ', href: '/dashboard/doctor/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-gray-200">
      <div className="flex flex-col grow pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center shrink-0 px-4 mb-8">
          <span className="text-2xl font-bold text-blue-600 italic">MedBooking</span>
        </div>
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <item.icon className="mr-3 h-6 w-6 text-gray-400 group-hover:text-blue-600" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="shrink-0 flex border-t border-gray-200 p-4">
        <button className="flex items-center text-sm font-medium text-red-600 hover:text-red-700">
          <ArrowLeftOnRectangleIcon className="mr-3 h-6 w-6" />
          Դուրս գալ
        </button>
      </div>
    </div>
  );
}