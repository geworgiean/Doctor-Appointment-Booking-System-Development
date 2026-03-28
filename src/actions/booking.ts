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
export async function getBusySlots(doctorId: string, dateOnly: string) {
  const startOfDay = new Date(`${dateOnly}T00:00:00`);
  const endOfDay = new Date(`${dateOnly}T23:59:59`);

  const busyAppointments = await prisma.appointment.findMany({
    where: {
      doctorId: doctorId,
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
      status: "CONFIRMED",
    },
    select: {
      date: true,
    },
  });

  return busyAppointments.map(app => {
    const d = new Date(app.date);
    return `${String(d.getHours()).padStart(2, '0')}:00`;
  });
}

export async function updateAppointmentStatus(appointmentId: string, newStatus: string) {
  try {
    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: newStatus as any },
    });

    revalidatePath("/dashboard/doctor");
    return { success: true };
  } catch (error) {
    console.error("Status update error:", error);
    return { error: "Չհաջողվեց թարմացնել կարգավիճակը" };
  }
}