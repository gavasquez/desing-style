//export const revalidate = 30;
import { getDataPage } from '@/actions/information/get-information';
import { About, Contact, Parallax, Footer, Service, TopMenu, WhatsAppButton, YoutubeCarousel } from '@/components';
import ContenidoDynamico from '@/components/ui/admin/contenido/DynamicContent';
import ScrollButton from '@/components/ui/scroll/ScrollButton';
import Image from 'next/image';

export default async function Page() {

  const { siteSettings, hero, aboutUs, serviceSettings, services, parallax, youtubeShorts, footer } = await getDataPage();

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

      <section className="py-36 md:py-30 w-full table relative bg-center bg-no-repeat bg-cover" style={ { backgroundImage: hero?.imageUrl ? `url(${ hero?.imageUrl })` : 'url("/uploads/bg-video.png")' } }>
        <div className="absolute inset-0 bg-black/80"></div>
        <div className="container relative">
          <div className="grid grid-cols-1 text-center">
            <Image src={ siteSettings?.siteLogoUrl ? siteSettings?.siteLogoUrl : '/uploads/favicon.ico' } width={ 250 } height={ 150 } className="mx-auto mt-8 sm:w-72 sm:h-72 md:w-96 md:h-96" alt={ siteSettings?.siteName ?? 'Logo del Sitio' } />
            <h4 className="text-white lg:text-5xl text-4xl lg:leading-normal leading-normal font-medium my-6 position-relative">{ hero?.title ? hero?.title : 'Titulo del Hero / Banner' }</h4>

            <div className="opacity-50 mb-0 max-w-xl text-lg mx-auto">
              <ContenidoDynamico text={ hero?.content ? hero?.content : 'Contenido del Hero / Banner' } colorText={ "#FFFFFF" } />
            </div>

            <div className="relative mt-8">
              <ScrollButton targetId="services" label={ hero?.textButton ? hero?.textButton : 'Servicios' } backgroundColor={ siteSettings?.siteColor ? siteSettings?.siteColor : '#000' } textColor={ siteSettings?.siteColorText ? siteSettings?.siteColorText : '#fff' } />
            </div>
          </div>
        </div>
      </section>

      <section className="relative md:py-24 py-16">

        {/* Sobre nosotros */ }
        <About about={ aboutUs } textColor={ siteSettings?.siteColorText ? siteSettings?.siteColorText : '#000' } />


        {/* Servicios */ }

        {
          services && <Service
            services={ services }
            siteColor={ siteSettings?.siteColor }
            title={ serviceSettings?.generalTitle }
            description={ serviceSettings?.generalDescription }
            mediaUrl={ serviceSettings?.generalImageUrl }
            textColor={ siteSettings?.siteColorText ? siteSettings?.siteColorText : '#000' }
          />
        }

        {/* Parallax */ }
        <Parallax parallax={ parallax } siteColor={ siteSettings?.siteColor } />
        
        {/* Shorts */}
        {
          youtubeShorts.length > 0 && <YoutubeCarousel shorts={ youtubeShorts } siteColorText={ siteSettings?.siteColorText } />
        }

        {/* Contact */ }
        <Contact
          siteColor={ siteSettings?.siteColor }
          siteColorText={ siteSettings?.siteColorText }
        />

      </section>
      {/* Footer */ }

      <WhatsAppButton phoneNumber={ footer?.phoneNumber } message="¡Hola! Quiero más información." />


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
