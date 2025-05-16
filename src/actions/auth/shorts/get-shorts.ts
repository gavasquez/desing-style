'use server';
import prisma from '@/lib/prisma';

export const getShorts = async (siteId: string) => {
  try {
    const shorts = await prisma.youtubeShorts.findMany({
      where: {
        siteId: siteId,
      }
    });
    return shorts;
  } catch (error) {
    return null;
  }
};