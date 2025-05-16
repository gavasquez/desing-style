import type { Metadata, ResolvingMetadata } from "next";
import "../app/assets/scss/tailwind.scss";
import './assets/css/material.css';
import { Poppins, Montserrat, Roboto, Open_Sans } from 'next/font/google';
import { getSiteSettings } from '@/actions/auth/settigns/getSiteSettings';
import siteId from "@/utils/getSiteId";
import { removeHtmlTags } from '@/utils/removeHtmlTags';
import { GoogleTagManager } from '@/components/ui/google-tag-manager/googleTagManager';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

const openSans = Open_Sans({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin'],
});

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const siteSettings = await getSiteSettings(siteId);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000/';
    const descripcion = siteSettings?.description
      ? removeHtmlTags(siteSettings.description)
      : 'Descripción del sitio';

    const siteTitle = siteSettings?.siteName ?? 'Nombre del sitio';

    return {
      metadataBase: new URL(siteUrl),
      title: {
        default: siteTitle || 'Baselanding',
        template: `%s | ${siteTitle}`,
      },
      description: descripcion,
      icons: {
        icon: [
          {
            url: siteSettings?.siteLogoUrl ?? '/uploads/favicon.ico',
            href: siteSettings?.siteLogoUrl ?? '/uploads/favicon.ico',
          }
        ],
        shortcut: [
          {
            url: siteSettings?.siteLogoUrl ?? '/uploads/favicon.ico',
            href: siteSettings?.siteLogoUrl ?? '/uploads/favicon.ico',
          }
        ],
      },
      openGraph: {
        type: 'website',
        title: siteTitle,
        description: descripcion,
        url: siteUrl,
        siteName: siteTitle,
        images: [
          {
            url: siteSettings?.siteLogoUrl || '/uploads/no-image.jpg',
            width: 400,
            height: 400,
            alt: siteTitle,
          },
        ],
      },
      viewport: {
        width: 'device-width',
        initialScale: 1,
      },
      robots: {
        index: true,
        follow: true,
      },
    };
  } catch (error) {
    return {
      title: 'Baselanding',
      description: 'Descripción del sitio',
      icons: {
        icon: [{ url: '/uploads/favicon.ico', href: '/uploads/favicon.ico' }],
        shortcut: [{ url: '/uploads/favicon.ico', href: '/uploads/favicon.ico' }],
      },
    };
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteSettings = await getSiteSettings(siteId);

  const fontClassName: Record<string, string> = {
    'Poppins': poppins.className,
    'Montserrat': montserrat.className,
    'Roboto': roboto.className,
    'Open Sans': openSans.className,
  }

  return (
    <html lang="en" dir="LTR">
      <head>
        {/* Usar el componente GTM correctamente dentro del head */}
        <GoogleTagManager gtmId={siteSettings?.googleTagManagerId ?? ''} />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1177088388515840" crossOrigin="anonymous"></script>
      </head>
      <body className={`${fontClassName[siteSettings?.font_family ?? fontClassName['Poppins']]}`}>
        {children}
      </body>
    </html>
  );
}
