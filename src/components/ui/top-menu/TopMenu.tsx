"use client";
import { CustomImage } from "@/components/image/CustomImage";
import Image from "next/image";
import Link from "next/link";
import {
  CiFacebook,
  CiInstagram,
  CiLinkedin,
  CiYoutube,
} from "react-icons/ci";
import { FaTiktok, FaXTwitter } from "react-icons/fa6";

interface Props {
  logoUrl: string | undefined | null;
  siteName: string | undefined | null;
  facebookUrl: string | undefined | null;
  twitterUrl: string | undefined | null;
  instagramUrl: string | undefined | null;
  linkedinUrl: string | undefined | null;
  youtubeUrl: string | undefined | null;
  tiktokUrl: string | undefined | null;
  siteColor: string | undefined | null;
  siteColorText: string | undefined | null;
}

export default function TopMenu( {
  logoUrl,
  siteName,
  facebookUrl,
  twitterUrl,
  instagramUrl,
  linkedinUrl,
  youtubeUrl,
  tiktokUrl,
  siteColor,
  siteColorText,
}: Props ) {
  const colorText = siteColorText || "#FFFFFF";

  return (
    <nav
      id="topnav"
      className="defaultscroll bg-slate-900 nav-sticky text-gray-200"
      style={ { backgroundColor: siteColor || "#000" } }
    >
      <div className="container flex items-center justify-between py-4 flex-col sm:flex-row">
        {/* Logo y Nombre del sitio */ }

        <div className="flex items-end space-x-4 mb-4 sm:mb-0">
          <Link className="logo" href="/">
            <CustomImage
              src={ logoUrl! }
              width={ 70 }
              height={ 70 }
              className="hidden dark:inline-block"
              alt={ siteName ? siteName : "Logo" }
            />
          </Link>
          <h1
            className="text-3xl font-bold tracking-wide"
            style={ { color: colorText } }
          >
            { siteName ? siteName : "Nombre del sitio" }
          </h1>
        </div>

        {/* Iconos de redes sociales */ }
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Facebook */ }
          { facebookUrl && (
            <Link
              href={ facebookUrl }
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en Facebook"
              title="Visitar nuestra página de Facebook"
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              tabIndex={ 0 }
            >
              <CiFacebook
                size={ 25 }
                className="hover:text-white transition-colors duration-200"
                style={ { color: colorText } }
                aria-hidden="true"
                role="img"
              />
              <span className="sr-only">Síguenos en Facebook</span>
            </Link>
          ) }

          {/* Twitter */ }
          { twitterUrl && (
            <Link
              href={ twitterUrl }
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en X (Twitter)"
              title="Visitar nuestro perfil de X (Twitter)"
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              tabIndex={ 0 }
            >
              <FaXTwitter
                size={ 20 }
                className="hover:text-white transition-colors duration-200"
                style={ { color: colorText } }
                aria-hidden="true"
                role="img"
              />
              <span className="sr-only">Síguenos en X (Twitter)</span>
            </Link>
          ) }

          {/* Instagram */ }
          { instagramUrl && (
            <Link
              href={ instagramUrl }
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en Instagram"
              title="Visitar nuestro perfil de Instagram"
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              tabIndex={ 0 }
            >
              <CiInstagram
                size={ 25 }
                className="hover:text-white transition-colors duration-200"
                style={ { color: colorText } }
                aria-hidden="true"
                role="img"
              />
              <span className="sr-only">Síguenos en Instagram</span>
            </Link>
          ) }

          {/* LinkedIn */ }
          { linkedinUrl && (
            <Link
              href={ linkedinUrl }
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en LinkedIn"
              title="Visitar nuestro perfil de LinkedIn"
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              tabIndex={ 0 }
            >
              <CiLinkedin
                size={ 25 }
                className="hover:text-white transition-colors duration-200"
                style={ { color: colorText } }
                aria-hidden="true"
                role="img"
              />
              <span className="sr-only">Síguenos en LinkedIn</span>
            </Link>
          ) }

          {/* YouTube */ }
          { youtubeUrl && (
            <Link
              href={ youtubeUrl }
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en YouTube"
              title="Visitar nuestro canal de YouTube"
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              tabIndex={ 0 }
            >
              <CiYoutube
                size={ 25 }
                className="hover:text-white transition-colors duration-200"
                style={ { color: colorText } }
                aria-hidden="true"
                role="img"
              />
              <span className="sr-only">Síguenos en YouTube</span>
            </Link>
          ) }

          {/* TikTok */ }
          { tiktokUrl && (
            <Link
              href={ tiktokUrl }
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Síguenos en TikTok"
              title="Visitar nuestro perfil de TikTok"
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              tabIndex={ 0 }
            >
              <FaTiktok
                size={ 20 }
                className="hover:text-white transition-colors duration-200"
                style={ { color: colorText } }
                aria-hidden="true"
                role="img"
              />
              <span className="sr-only">Síguenos en TikTok</span>
            </Link>
          ) }
        </div>
      </div>
    </nav>
  );
}
