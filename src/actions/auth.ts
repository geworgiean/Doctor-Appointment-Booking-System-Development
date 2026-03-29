"use server"

import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { Role } from "@prisma/client"
import { revalidatePath } from "next/cache"

export const registerUser = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const roleInput = formData.get("role") as string || "PATIENT";
  const role = roleInput as Role;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role, 
        ...(role === "DOCTOR" ? {
          doctorProfile: {
            create: {
              specialty: "",
              bio: "",
              isVerified: false, 
            }
          }
        } : {})
      },
    });

    revalidatePath("/dashboard/admin");
    
    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: "Այս էլ. հասցեն արդեն գրանցված է:" };
    }
    console.error("Registration Error:", error);
    return { error: "Գրանցման սխալ տեղի ունեցավ:" };
  }
};