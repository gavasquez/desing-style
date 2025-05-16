"use server";

import prisma from "@/lib/prisma";
import { YoutubeShorts } from "@prisma/client";
import { revalidatePath } from "next/cache";

// Definimos el tipo de retorno
type CreateShortResponse = {
  ok: boolean;
  message: string;
  short?: YoutubeShorts;
}

export const createShort = async (formData: FormData, siteId: string): Promise<CreateShortResponse> => {
  try {
    const shortsUrl = formData.get("shortsUrl")?.toString();

    if (!shortsUrl) {
      return {
        ok: false,
        message: "La URL del short es requerida"
      };
    }

    const short = await prisma.youtubeShorts.create({
      data: {
        siteId: siteId,
        shortsUrl,
      },
    });

    revalidatePath("/"); // Revalidate the homepage to update the cache

    return {
      ok: true,
      message: "Se creó el Short con éxito",
      short,
    };

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al actualizar o crear el Short",
    };
  }
};