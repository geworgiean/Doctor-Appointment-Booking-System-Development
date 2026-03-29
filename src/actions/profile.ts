"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateDoctorProfile(userId: string, formData: FormData) {
  const name = formData.get("name") as string;
  const specialty = formData.get("specialty") as string;
  const bio = formData.get("bio") as string;
  const diplomaUrl = formData.get("diplomaUrl") as string;

  if (!userId) {
    return { error: "User ID-ն բացակայում է:" };
  }

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { name: name },
    });

    await prisma.doctorProfile.upsert({
      where: { userId: userId },
      update: {
        specialty: specialty,
        bio: bio,
        diplomaUrl: diplomaUrl,
      },
      create: {
        userId: userId,
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