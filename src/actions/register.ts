"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";

export const register = async (values: any, role: string) => {
  const { email, password, name } = values;
  const hashedPassword = await bcrypt.hash(password, 10);

  const userRole = role === "DOCTOR" ? Role.DOCTOR : Role.PATIENT;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: userRole,
        doctorProfile: userRole === Role.DOCTOR ? {
          create: {} 
        } : undefined,
      },
    });

    return { success: "Հաշիվը ստեղծվեց:" };
  } catch (error) {
    console.error(error);
    return { error: "Գրանցման սխալ:" };
  }
};