"use server"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"


export async function getAvailableSlots(doctorId: string, date: Date) {
  const workingHours = [
    "09:00", "10:00", "11:00", "12:00", 
    "14:00", "15:00", "16:00", "17:00"
  ];

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const bookedAppointments = await prisma.appointment.findMany({
    where: {
      doctorId: doctorId,
      date: {
        gte: startOfDay,
        lte: endOfDay,
      },
      status: { not: "CANCELLED" }
    },
    select: { date: true }
  });

  const bookedTimes = bookedAppointments.map((app: {
          date: {
              toLocaleTimeString: (arg0: string, arg1: {
                  hour: string; minute: string; timeZone: string;
              }) => any;
          };
      }) => {
    return app.date.toLocaleTimeString("en-GB", { 
      hour: "2-digit", 
      minute: "2-digit",
      timeZone: "UTC"
    });
  });

  const availableSlots = workingHours.filter(slot => !bookedTimes.includes(slot));

  return availableSlots;
}

export async function bookAppointment(doctorId: string, patientId: string, appointmentDate: Date) {
    try {
          const existingAppointment = await prisma.appointment.findFirst({            where: {
                doctorId: doctorId,
                date:   appointmentDate,
                status: { not: "CANCELLED" }
            }
        });

        if (existingAppointment) {
            return { success: false, error: "Այս ժամն արդեն զբաղված է:" };
        }

        await prisma.appointment.create({
            data: {
                doctorId,
                patientId,
                date: appointmentDate,
            }
        });

        revalidatePath("/appointments");
        return { success: true };
       } catch (e) {
        return {success: false, error: "Սխալ տեղի ունեցավ:" };
    }
}

export async function cancelAppointment(id: string) {
  try {
    await prisma.appointment.update({
      where: { id },
      data: { status: "CANCELLED"},
    });

    revalidatePath("/dashboard/doctor");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Չհաջողվեց չեղարկել այցը" };
  }
}