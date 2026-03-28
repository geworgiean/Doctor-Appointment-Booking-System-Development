import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import ProfileForm from "@/components/ProfileForm";

export default async function ProfilePage() {
  const session = await auth();
  const doctor = await prisma.user.findUnique({
    where: { id: session?.user?.id },
    include: { doctorProfile: true }
  });

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Իմ Պրոֆիլը</h1>
      <ProfileForm doctor={doctor} />
    </div>
  );
}