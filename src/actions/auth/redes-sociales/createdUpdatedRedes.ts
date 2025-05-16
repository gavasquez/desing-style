"use server";
import prisma from "@/lib/prisma";
import { SiteSettings } from "@prisma/client";
import { uploadImage } from "../image/upload";
import { revalidatePath } from "next/cache";

export const createUpdatedRedesSociales = async (formData: FormData, siteId: string) => {
    try {

        if (!siteId || siteId === "") {
            return {
                ok: false,
                message: "No se encontró el id del sitio",
            };
        }

        const existingSiteSettings = await prisma.siteSettings.findUnique({
            where: {
                siteId,
            },
        });

        let site: SiteSettings;
        let message = "";

        if (existingSiteSettings) {
            site = await prisma.siteSettings.update({
                where: {
                    id: existingSiteSettings.id,
                },
                data: {
                    facebookUrl: formData.get("facebookUrl")!.toString(),
                    youtubeUrl: formData.get("youtubeUrl")!.toString(),
                    twitterUrl: formData.get("twitterUrl")!.toString(),
                    linkedinUrl: formData.get("linkedinUrl")!.toString(),
                    instagramUrl: formData.get("instagramUrl")!.toString(),
                    tiktokUrl: formData.get("tiktokUrl")!.toString(),
                },
            });
            message = "Se actualizó correctamente";
        } else {
            site = await prisma.siteSettings.create({
                data: {
                    facebookUrl: formData.get("facebookUrl")!.toString(),
                    youtubeUrl: formData.get("youtubeUrl")!.toString(),
                    twitterUrl: formData.get("twitterUrl")!.toString(),
                    linkedinUrl: formData.get("linkedinUrl")!.toString(),
                    instagramUrl: formData.get("instagramUrl")!.toString(),
                    tiktokUrl: formData.get("tiktokUrl")!.toString(),
                    siteId: siteId,
                },
            });
            message = "Se creó correctamente";
        }

        const file = formData.get("imageUrl");
        if (file) {
            const uploadedImage = await uploadImage(file as File);

            await prisma.siteSettings.update({
                where: {
                    id: site.id,
                },
                data: {
                    siteLogoUrl: uploadedImage,
                },
            });
        }

        revalidatePath("/"); // Revalidate the homepage to update the cache

        return {
            ok: true,
            site,
            message,
        };
    } catch (error) {
        return {
            ok: false,
            message: "Error al actualizar o crear la configuración",
        };
    }
};
