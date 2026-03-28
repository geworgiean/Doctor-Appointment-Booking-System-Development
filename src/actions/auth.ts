"use server"

import prisma from "../lib/prisma"
import bcrypt from "bcryptjs"

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const role = formData.get("role") as string 

  if (!email || !password) return { error: "Լրացրեք բոլոր դաշտերը" }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: (role as any) || "PATIENT",
      }
    })
    return { success: true }
  } catch (e: any) {
    if (e.code === 'P2002') return { error: "Այս էլ. փոստը արդեն զբաղված է" }
    return { error: "Սխալ տեղի ունեցավ գրանցման ժամանակ" }
  }
}