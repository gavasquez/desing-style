"use server";
import prisma from "@/lib/prisma";
import { Service } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { uploadImage } from "../image/upload";

export const createUpdateService = async (
  formData: FormData,
  serviceSettingsId: string
) => {
  try {
    const siteId = process.env.SITE_ID!;
    const serviceId = formData.get("id")?.toString();

    let service: Service;
    let message = "";

    const existingService = serviceId
      ? await prisma.service.findUnique({
          where: { id: serviceId, serviceModuleId: serviceSettingsId, siteId },
          select: { mediaUrls: true },
        })
      : null;

    const files = formData.getAll("mediaUrls") as File[];
    let uploadedImages: string[] = [];

    if (files.length > 0) {
      uploadedImages = await Promise.all(files.map(uploadImage));
    }

    if (serviceId && existingService) {
      service = await prisma.service.update({
        where: { id: serviceId, serviceModuleId: serviceSettingsId },
        data: {
          title: formData.get("title")!.toString(),
          description: formData.get("description")!.toString(),
          mediaUrls: [...(existingService?.mediaUrls || []), ...uploadedImages],
        },
      });
      message = "Se actualizó correctamente";
    } else {
      service = await prisma.service.create({
        data: {
          title: formData.get("title")!.toString(),
          description: formData.get("description")!.toString(),
          serviceModuleId: serviceSettingsId,
          siteId,
          mediaUrls: uploadedImages,
        },
      });
      message = "Se creó correctamente";
    }

    revalidatePath("/");
    revalidatePath("/admin/services");

    return { ok: true, service, message };
  } catch (error) {
    console.log(error);
    return { ok: false, message: "Error al actualizar o crear la configuración" };
  }
};