"use server"

import prisma from "@/lib/prisma"

export async function getUserRole(email: string) {
    const user = await prisma.user.findUnique({
        where: { email },
        select: { role: true }
    });
    return user?.role;
}