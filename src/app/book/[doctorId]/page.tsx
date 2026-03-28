import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import BookingForm from "@/components/BookingForm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default async function BookingPage({ params }: { params: Promise<{ doctorId: string }> }) {
  const { doctorId } = await params;
  const session = await auth();

  const doctor = await prisma.user.findUnique({
    where: { id: doctorId },
    include: { doctorProfile: true }
  });

  if (!doctor || doctor.role !== "DOCTOR") return notFound();

  return (
    <div className="max-w-3xl mx-auto p-8 relative">
      <Link 
        href="/dashboard/patient" 
        className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-6 group"
      >
        <ArrowLeftIcon className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
        Վերադառնալ գլխավոր մենյու
      </Link>

      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Ամրագրել այցելություն</h1>
        <p className="text-gray-500 mb-8">Բժիշկ՝ <span className="text-blue-600 font-bold">{doctor.name}</span></p>
        
        <BookingForm 
          doctorId={doctor.id} 
          patientId={session?.user?.id!} 
        />
      </div>
    </div>
  );
}