"use server"

import { auth } from "@/auth"
import prisma from "@/lib/prisma"

export const getAllUsers = async () => {
    const session = await auth();

    if (!session) {
        return { error: "Մուտքը արգելված է: Խնդրում ենք մուտք գործել:"};
    }

    if (session.user?.role !== "ADMIN") {
        return { error: "Այս գործողությունը հասանելի է միայն Ադմինիստրատորին:"};
    }

    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email:true,
                role: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return { success: users };
    } catch (error) {
        return { error: "Տվյալների բեռնման սխալ:"};
    }
};
