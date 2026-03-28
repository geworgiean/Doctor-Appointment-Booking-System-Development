import prisma from "@/lib/prisma";
import BookingForm from "@/components/BookingForm";
import { notFound } from "next/navigation";

export default async function BookingPage({ 
  params 
}: { 
  params: Promise<{ doctorId: string }> 
}) {
  const { doctorId } = await params;

  const doctor = await prisma.user.findUnique({
    where: { id: doctorId },
    include: { doctorProfile: true }
  });

  if (!doctor || doctor.role !== "DOCTOR") {
    return notFound();
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Ամրագրել այց</h1>
        <p className="text-gray-500 mb-6">
          Դուք ամրագրում եք այց բժիշկ <span className="font-bold text-gray-900">{doctor.name}</span>-ի մոտ 
          ({doctor.doctorProfile?.specialty})
        </p>

        <BookingForm doctorId={doctorId} patientId={""} />
      </div>
    </div>
  );
}