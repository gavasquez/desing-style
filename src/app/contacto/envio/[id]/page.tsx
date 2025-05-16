import { Metadata, ResolvingMetadata } from "next";
import { getFooter } from "@/actions/auth/footer/get-footer";
import { getSiteSettings } from "@/actions/auth/settigns/getSiteSettings";
import { getFormById } from "@/actions/contact/get-form-by-id";
import { Footer, TopMenu } from "@/components";
import siteId from "@/utils/getSiteId";
import Link from "next/link";
import { BiMailSend } from 'react-icons/bi';
import { IoArrowBackCircle } from "react-icons/io5";
import { MdError } from 'react-icons/md';
import { removeHtmlTags } from '@/utils/removeHtmlTags';

interface Props {
  params: Promise<{ id: string; }>;
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const previousImages = ( await parent ).openGraph?.images || [];

    const siteSettings = await getSiteSettings( siteId );
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000/';
    const descripcion = siteSettings?.description
      ? removeHtmlTags( siteSettings.description )
      : 'Descripción del sitio';

    const siteName = siteSettings?.siteName ?? 'Nombre del sitio';
    const title = `Contacto`;
    const logoUrl = siteSettings?.siteLogoUrl || '/uploads/no-image.jpg';

    return {
      metadataBase: new URL( siteUrl ),
      title,
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
        title,
        description: descripcion,
        url: `${ siteUrl }contacto`,
        siteName,
        images: [
          {
            url: logoUrl,
            width: 400,
            height: 400,
            alt: siteName,
          },
          ...previousImages,
        ],
      },
      keywords: [ 'contacto', siteName, 'información de contacto' ],
      alternates: {
        canonical: `${ siteUrl }contacto`,
      },
    };
  } catch ( error ) {
    console.error( 'Error loading contact page metadata:', error );
    return {
      title: 'Contacto',
      description: 'Página de contacto',
    };
  }
}


export default async function ContactoEnvioPage( { params }: Props ) {
  const { id } = await params;

  const siteSettings = await getSiteSettings( siteId );
  const footer = await getFooter( siteId );
  const formulario = await getFormById( id );

  const title = formulario?.id
    ? `¡Gracias por tu mensaje, ${ formulario.fullName }!`
    : "¡Algo salió mal!";
  const message = formulario?.id
    ? `Tu mensaje ha sido enviado exitosamente, ${ formulario.fullName }. Nos pondremos en contacto contigo lo antes posible.`
    : "Hubo un error al enviar tu mensaje. Por favor, inténtalo nuevamente más tarde.";

  return (
    <>
      <TopMenu
        logoUrl={ siteSettings?.siteLogoUrl }
        siteName={ siteSettings?.siteName }
        facebookUrl={ siteSettings?.facebookUrl }
        twitterUrl={ siteSettings?.twitterUrl }
        instagramUrl={ siteSettings?.instagramUrl }
        linkedinUrl={ siteSettings?.linkedinUrl }
        youtubeUrl={ siteSettings?.youtubeUrl }
        tiktokUrl={ siteSettings?.tiktokUrl }
        siteColor={ siteSettings?.siteColor }
        siteColorText={ siteSettings?.siteColorText }
      />
      <section className="relative md:py-24 py-40 text-center">
        <div className="mt-20 mb-20">
          <div className="flex justify-center">
            {
              formulario?.id
                ? <BiMailSend size={ 80 } style={ { color: siteSettings?.siteColor || "#000" } } />
                : <MdError size={ 80 } style={ { color: siteSettings?.siteColor || "#000" } } />
            }
          </div>
          <h1>{ title }</h1>
          <span>{ message }</span>
          <div className="flex justify-center mt-10">
            <Link
              href="/"
              className="text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 hover:text-white transition-all flex items-center"
              style={ { backgroundColor: siteSettings?.siteColor || "#000", color: siteSettings?.siteColorText || "#fff" } }
            >
              <IoArrowBackCircle size={ 24 } />
              <span className="ml-1">Regresar</span>
            </Link>
          </div>
        </div>
      </section>
      <Footer
        id={ siteSettings?.id }
        siteName={ siteSettings?.siteName }
        footer={ footer }
        logoUrl={ siteSettings?.siteLogoUrl }
        description={ siteSettings?.description }
        facebookUrl={ siteSettings?.facebookUrl }
        twitterUrl={ siteSettings?.twitterUrl }
        instagramUrl={ siteSettings?.instagramUrl }
        linkedinUrl={ siteSettings?.linkedinUrl }
        youtubeUrl={ siteSettings?.youtubeUrl }
        tiktokUrl={ siteSettings?.tiktokUrl }
        siteColor={ siteSettings?.siteColor }
        siteColorText={ siteSettings?.siteColorText }
        policyPrivacyText={ siteSettings?.policyPrivacyText }
      />
    </>
  );
}
