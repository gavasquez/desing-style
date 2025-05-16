"use server";
import { signIn } from "@/auth.config";
import prisma from "@/lib/prisma";
import siteId from '@/utils/getSiteId';
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: { ok: boolean; message: string },
  formData: FormData
) {
  try {

    await prisma.$connect();

    const email = formData.get("email");

    if (!email) {
      return { ok: false, message: "Correo electrónico no proporcionado." };
    }
    
    const user = await prisma.user.findUnique({
      where: {
        email: email.toString().toLowerCase(),
        siteId: siteId,
      },
    });

    if (!user) {
      return { ok: false, message: `No se encontró usuario para el sitio ${siteId}` };
    }

    const result = await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    if (result?.error) {
      return { ok: false, message: result.error };
    }

    return { ok: true, message: "Login successful." };

  } catch (error) {
    
    // Manejar errores específicos o genéricos
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { ok: false, message: "Credenciales Invalidas." };
        default:
          return { ok: false, message: "Error de autenticación inesperado." };
      }
    }

    return { ok: false, message: "Ha ocurrido un error inesperado, Por favor validar con el administrador." };
  }
}
