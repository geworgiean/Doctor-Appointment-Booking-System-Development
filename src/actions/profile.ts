"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function updateDoctorProfile(userId: string, formData: FormData) {
  const name = formData.get("name") as string;
  const specialty = formData.get("specialty") as string;
  const bio = formData.get("bio") as string;
  const diplomaUrl = formData.get("diplomaUrl") as string;
  
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Դուք պետք է մուտք գործեք համակարգ:" };
  }

  const isAdmin = session.user.role === "ADMIN";
  const targetUserId = isAdmin ? userId : session.user.id; 

  try {
    await prisma.user.update({
      where: { id: targetUserId },
      data: { name: name },
    });

    await prisma.doctorProfile.upsert({
      where: { userId: targetUserId },
      update: {
        specialty: specialty,
        bio: bio,
        diplomaUrl: diplomaUrl,
      },
      create: {
        userId: targetUserId,
        specialty: specialty || "",
        bio: bio || "",
        diplomaUrl: diplomaUrl || "",
        isVerified: false,
      },
    });

    revalidatePath("/dashboard/doctor/profile");
    
    return { success: true };
  } catch (error) {
    console.error("Profile update failed:", error);
    return { error: "Տվյալների պահպանման սխալ տեղի ունեցավ:" };
  }
}