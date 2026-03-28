"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createAppointment(formData: FormData) {
    const doctorId = formData.get("doctorId") as string;
    const patientId = formData.get("patientId") as string;
    const dateString = formData.get("date") as string;

    const appointmentDate = new Date(dateString);

    try {
        const existingAppointment = await prisma.appointment.findFirst({
            where: {
                doctorId: doctorId,
                date: appointmentDate,
                status: "CONFIRMED"
            }
        });

        if (existingAppointment) {
            return { error: "Այս ժամը արդեն զբաղված է: Խնդրում ենք ընտրել այլ ժամ:" };
        }

        await prisma.appointment.create({
            data: {
                doctorId,
                patientId,
                date: appointmentDate,
                status: "CONFIRMED"
            }
        });

        revalidatePath("/dashboard/patient");
        return { success: true };
    } catch (error) {
        console.error("Booking error:", error);
        return { error: "Տեղի է ունեցել սխալ ամրագրման ժամանակ:" };
    }
}