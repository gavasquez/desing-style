'use server';
import prisma from "@/lib/prisma";
import { revalidatePath } from 'next/cache';

export const deleteShortById = async (id: string) => {
  try {
    const siteId = process.env.SITE_ID!;
    await prisma.youtubeShorts.delete({
      where: {
        id,
        siteId,
      },
    });
    revalidatePath('/');
    revalidatePath("/admin/shorts");

    return {
      ok: true,
      message: "Se ha eliminado el Short correctamente",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al eliminar el Short",
    };
  }
};
