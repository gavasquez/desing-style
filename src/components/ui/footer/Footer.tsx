import { truncateDescription } from '@/utils/truncateDescripcion';
import Image from 'next/image';
import Link from 'next/link';
import { CiFacebook, CiInstagram, CiLinkedin, CiTwitter, CiYoutube } from 'react-icons/ci';
import { FaTiktok, FaXTwitter } from 'react-icons/fa6';
import ContenidoDynamico from '../admin/contenido/DynamicContent';

interface Props {
  id: string | undefined | null;
  siteName: string | undefined | null;
  logoUrl: string | undefined | null;
  description: string | undefined | null;
  facebookUrl: string | undefined | null;
  twitterUrl: string | undefined | null;
  instagramUrl: string | undefined | null;
  linkedinUrl: string | undefined | null;
  youtubeUrl: string | undefined | null;
  tiktokUrl: string | undefined | null;
  siteColor: string | undefined | null;
  siteColorText: string | undefined | null;
  policyPrivacyText: string | undefined | null;
  footer: {
    id: string;
    address: string;
    phoneNumber: string;
    map_iframe: string | undefined | null;
    createdAt: Date;
    updatedAt: Date;
  } | null;
}

export default function Footer( { id, siteName, logoUrl, footer, description, facebookUrl, twitterUrl, instagramUrl, linkedinUrl, youtubeUrl, tiktokUrl, siteColor, siteColorText, policyPrivacyText }: Props ) {

  const { address = '', phoneNumber = '', map_iframe = '' } = footer || {};
  const colorText = siteColorText || '#FFFFFF';
  const descripcionSite = description ? description : 'Descripción de la web';

  return (
    <div>
      <footer className="footer relative text-gray-200 shadow-footer-strong bg-slate-900" style={ { backgroundColor: siteColor || '#000' } }>
        <div className="container relative">
          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <div className="py-[30px] px-0">
                <div className="grid md:grid-cols-12 grid-cols-1 gap-[30px]">
                  <div className="lg:col-span-4 md:col-span-12">

                    <div className="flex items-center justify-start space-x-2">
                      <Link href="/#" className="text-[22px] focus:outline-none">
                        <Image src={ logoUrl ? logoUrl : '/uploads/favicon.ico' } width={ 50 } height={ 50 } alt={ description ? description : 'Logo de la web' } />
                      </Link>
                      <h1 className="text-center mt-2" style={ { color: colorText } }>{ siteName ? siteName : 'Nombre del sitio' }</h1>
                    </div>
                    <ContenidoDynamico text={ descripcionSite! } colorText={ colorText } />
                  </div>

                  <div className="lg:col-span-4 md:col-span-12 grid items-center">
                    <div className="text-center">
                      <h6 className="tracking-[0px] font-semibold" style={ { color: colorText } }>
                        Dirección: { address ? address : 'No se ha cargado ninguna dirección' }
                      </h6>
                      <h6 className="tracking-[0px] font-semibold mt-5" style={ { color: colorText } }>
                        Teléfono: { phoneNumber ? phoneNumber : 'No se ha cargado ningun número de teléfono' }
                      </h6>
                    </div>
                  </div>
                  {/* Mapa de Google */}
                  <div className="lg:col-span-4 md:col-span-12 grid items-center">
                    { map_iframe && (
                      <div
                        dangerouslySetInnerHTML={ { __html: map_iframe } }
                        className="w-full h-[300px] md:h-[200px] rounded-md overflow-hidden"
                      ></div>
                    ) }
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center py-[10px] gap-4">
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
                  size={ 30 }
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
                  size={ 26 }
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
                  size={ 30 }
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
                  size={ 30 }
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
                  size={ 30 }
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
                  size={ 26 }
                  className="hover:text-white transition-colors duration-200"
                  style={ { color: colorText } }
                  aria-hidden="true"
                  role="img"
                />
                <span className="sr-only">Síguenos en TikTok</span>
              </Link>
            ) }
          </div>
          <div className="flex items-center  justify-center py-[10px] gap-4">
            {
              policyPrivacyText && ( <Link href={ `/policy-privacy/${ id }` } className="text-[16px] focus:outline-none" style={ { color: colorText } } target="_blank">
                Política de privacidad
              </Link> )
            }
          </div>
        </div>
        <div className="py-[30px] px-0 border-t" style={ { borderColor: colorText } }>
          <div className="container relative text-center">
            <div className="grid items-center">
              <Link href="https://narvaldreams.com" className="text-center" target="_blank">
                <p className="mb-0" style={ { color: colorText } }>© { new Date().getFullYear() } Agencia de desarrollo web NarvalDreams <i className="mdi mdi-heart text-red-600"></i></p>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}