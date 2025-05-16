"use server";
import prisma from "@/lib/prisma";
import siteId from "@/utils/getSiteId";
import nodemailer from 'nodemailer';
import type { TransportOptions } from 'nodemailer';

interface Contact {
  fullName: string;
  email: string;
  phoneNumber: string;
  description: string;
}

export const saveContactForm = async ({
  fullName,
  email,
  phoneNumber,
  description,
}: Contact) => {

  const siteSettings = await prisma.siteSettings.findFirst({
    where: {
      siteId: siteId,
    },
  });

  if (!siteSettings?.emailSite) {
    return {
      ok: false,
      message: "No se ha configurado el correo, contacte con el administrador",
    };
  }

  try {
    if (siteSettings?.emailSite) {
      // Intentar enviar el correo
      await sendEmailToSite(
        email,
        fullName,
        phoneNumber,
        description,
        siteSettings.emailSite
      );
    }

    // Solo si el correo se envía correctamente, guardar en la base de datos
    const formulario = await prisma.registrationForm.create({
      data: {
        email,
        fullName,
        phoneNumber,
        description,
        siteId: siteId,
      },
    });

    return {
      ok: true,
      message: "El correo fue enviado y registrado correctamente",
      idForm: formulario.id,
    };
  } catch (error) {
    console.error({ error });
    return {
      ok: false,
      message:
        "Ocurrió un error al procesar la solicitud. Contacte con el administrador",
    };
  }
};

const sendEmailToSite = async (
  email: string,
  fullName: string,
  phoneNumber: string,
  description: string,
  emailSite: string
) => {

  const VERIFIED_DOMAIN = process.env.MAILERSEND_VERIFIED_DOMAIN?.trim() || '';
  const fromEmail = `noreply@${VERIFIED_DOMAIN}`;

  const transporter = nodemailer.createTransport({
    host: 'smtp.mailersend.net',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAILERSEND_SMTP_USER?.trim() || '',
      pass: process.env.MAILERSEND_SMTP_PASS?.trim() || ''
    },
    tls: {
      ciphers: 'TLS_AES_128_GCM_SHA256',
      rejectUnauthorized: false
    }
  } as TransportOptions);

  try {
    // Verificar la conexión
    await transporter.verify();
    console.log('✅ Conexión SMTP verificada');

    const mailOptions = {
      from: {
        name: 'Formulario de Contacto',
        address: fromEmail
      },
      to: emailSite,
      replyTo: email,
      subject: 'Nuevo mensaje del formulario de contacto',
      text: `
        Tienes un nuevo mensaje de contacto:

        Nombre completo: ${fullName}
        Email: ${email}
        Teléfono: ${phoneNumber}
        Descripción: ${description}
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('📧 Correo enviado exitosamente');
    return info;
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
};

