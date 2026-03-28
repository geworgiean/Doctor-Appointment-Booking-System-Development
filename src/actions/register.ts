"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as string;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role as any,
      },
    });
    
    return { success: true }; // Վերադարձնում ենք հաջողության ստատուս
  } catch (error) {
    console.error("Գրանցման սխալ:", error);
    return { error: "Այս էլ. հասցեն արդեն զբաղված է:" };
  }
}