import ContenidoDynamico from '../admin/contenido/DynamicContent';
import ServicesGrid from './ServicesGrid';

export interface Service {
  id: string;
  title: string;
  description: string;
  mediaUrls: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface Props {
  siteColor: string | undefined | null;
  services: Service[];
  title?: string;
  description?: string;
  mediaUrl: string | null | undefined;
  textColor: string;
}

export default function Service( { services, siteColor, title, description, textColor }: Props ) {
  return (
    <div id="services" className="container relative md:mt-24 mt-16 md:mb-24 mb-10">
      <div className="grid grid-cols-1 pb-8 text-center">
        <h5 className="text-2xl font-bold uppercase mb-2" style={ { color: textColor === '#ffffff' ? '#000' : textColor } }>{ title ? title : 'Titulo del servicio' }</h5>
        <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">¿Que ofrecemos?</h3>
        <div className="max-w-xl mx-auto">
          <ContenidoDynamico text={ description ? description : 'Descripción del servicio' } colorText={ '#212020' } />
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl place-items-center">
          { services.map( ( service ) => (
            <ServicesGrid key={ service.id } service={ service } siteColor={ siteColor } />
          ) ) }
        </div>
      </div>
    </div>
  );
}