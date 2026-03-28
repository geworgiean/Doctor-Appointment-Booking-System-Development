"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateDoctorProfile(userId: string, formData: any) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        name: formData.name,
        doctorProfile: {
          upsert: {
            create: { 
                specialty: formData.specialty,
                bio: formData.bio 
            },
            update: { 
                specialty: formData.specialty,
                bio: formData.bio 
            },
          },
        },
      },
    });

    revalidatePath("/dashboard/doctor/profile");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}