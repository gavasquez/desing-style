'use server';
import prisma from "@/lib/prisma";
import siteId from "@/utils/getSiteId";
import { revalidatePath } from 'next/cache';

export const deleteFormById = async (id: string) => {
  try {
    await prisma.registrationForm.delete({
      where: {
        id,
        siteId,
      },
    });

    revalidatePath("/admin/form");

    return {
      ok: true,
      message: "Se ha eliminado el registro correctamente",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al eliminar el registro",
    };
  }
};
