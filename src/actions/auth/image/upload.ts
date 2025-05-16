import { v2 as cloudinary } from "cloudinary";
cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const uploadImage = async (image: File) => {
  try {
    if (!(image instanceof File)) {
      throw new Error("El archivo proporcionado no es válido");
    }

    const buffer = await image.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    const response = await cloudinary.uploader.upload(
      `data:${image.type};base64,${base64Image}`,
      {
        folder: 'base-landing',
        transformation: [
          { width: 800, height: 800, crop: "limit" },
          { quality: "auto", fetch_format: "webp" },
          { flags: "preserve_transparency" },
        ],
        format: 'webp', // Fuerza el formato de salida a webp
      }
    );

    return response.secure_url;
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw new Error("Error al procesar la imagen");
  }
};