"use server";
import prisma from '@/lib/prisma';

export const getProfile = async (siteId: string) => {
  try {
    const siteAbout = await prisma.user.findUnique( {
      where: {
        siteId: siteId,
      },
    } );
    return siteAbout;
  } catch ( error ) {
    return null;
  }
};