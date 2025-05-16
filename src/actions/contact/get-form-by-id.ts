
"use server";
import prisma from "@/lib/prisma";
import siteId from "@/utils/getSiteId";

export const getFormById = async (id: string) => {
  try {
    const formulario = await prisma.registrationForm.findUnique({
      where: {
        id: id,
        siteId: siteId,
      },
    });
    return formulario;
  } catch (error) {
    return null;
  }
};
