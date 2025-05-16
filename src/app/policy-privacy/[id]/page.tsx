import { Metadata, ResolvingMetadata } from 'next';
import { getFooter } from '@/actions/auth/footer/get-footer';
import { getSettingById } from '@/actions/auth/settigns/get-setting-by-id';
import { getSiteSettings } from '@/actions/auth/settigns/getSiteSettings';
import { Footer, TopMenu } from '@/components';
import { PolicyPrivacy } from '@/components/ui/policy-privacy/PolicyPrivacy';
import siteId from '@/utils/getSiteId';
import Link from 'next/link';
import { IoArrowBackCircle } from 'react-icons/io5';
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
    const title = 'Políticas de Privacidad';
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
        url: `${ siteUrl }politicas-de-privacidad`,
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
      keywords: [ 'políticas de privacidad', siteName, 'términos y condiciones' ],
      alternates: {
        canonical: `${ siteUrl }politicas-de-privacidad`,
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
      },
    };
  } catch ( error ) {
    console.error( 'Error loading privacy policy metadata:', error );
    return {
      title: 'Políticas de Privacidad',
      description: 'Políticas de privacidad del sitio',
    };
  }
}


export default async function PolicyPrivacyPage( { params }: Props ) {

  const { id } = await params;

  const site = await getSettingById( id );

  const footer = await getFooter( siteId );

  return (
    <>
      <TopMenu
        logoUrl={ site?.siteLogoUrl }
        siteName={ site?.siteName }
        facebookUrl={ site?.facebookUrl }
        twitterUrl={ site?.twitterUrl }
        instagramUrl={ site?.instagramUrl }
        linkedinUrl={ site?.linkedinUrl }
        youtubeUrl={ site?.youtubeUrl }
        tiktokUrl={ site?.tiktokUrl }
        siteColor={ site?.siteColor }
        siteColorText={ site?.siteColorText }
      />
      <div className="container-fluid relative px-40 mt-16">
        <section className="relative md:py-24 py-16">
          <PolicyPrivacy policyPrivacyText={ site?.policyPrivacyText ?? '' } />
          <div className="flex justify-center items-center mt-5">
            <Link href="/" className=" text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 hover:text-white transition-all flex justify-center items-center" style={ { backgroundColor: site?.siteColor || '#000', color: site?.siteColorText || '#fff' } }>
              <IoArrowBackCircle size={ 24 } />
              <span className="ml-1">Regresar</span>
            </Link>
          </div>
        </section>
      </div>
      <Footer
        id={ site?.id }
        siteName={ site?.siteName }
        footer={ footer }
        logoUrl={ site?.siteLogoUrl }
        description={ site?.description }
        facebookUrl={ site?.facebookUrl }
        twitterUrl={ site?.twitterUrl }
        instagramUrl={ site?.instagramUrl }
        linkedinUrl={ site?.linkedinUrl }
        youtubeUrl={ site?.youtubeUrl }
        tiktokUrl={ site?.tiktokUrl }
        siteColor={ site?.siteColor }
        siteColorText={ site?.siteColorText }
        policyPrivacyText={ site?.policyPrivacyText }
      />
    </>
  );
}