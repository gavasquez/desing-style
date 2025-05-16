import { FaWhatsapp } from 'react-icons/fa';

interface Props {
  phoneNumber: string | null | undefined;
  message: string;
}

export const WhatsAppButton = ( { phoneNumber, message }: Props ) => {

  const whatsappLink = `https://wa.me/52${ phoneNumber }?text=${ encodeURIComponent( message ) }`;

  if ( !phoneNumber ) {
    return null;
  }

  return (
    <div>
      <a
        href={ whatsappLink }
        target="_blank"
        rel="noopener noreferrer"
        style={ {
          position: 'fixed',
          bottom: '70px',
          right: '20px',
          zIndex: 1000,
        } }
        aria-label="Enviar mensaje por WhatsApp"
        title="Enviar mensaje por WhatsApp"
      >
        <button
          style={ {
            padding: '15px 20px',
            backgroundColor: '#25D366',
            color: 'white',
            borderRadius: '50%',
            border: 'none',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
            cursor: 'pointer',
          } }
          aria-label="Botón de WhatsApp"
          role="button"
        >
          <FaWhatsapp size={ 30 } />
        </button>
      </a>
    </div>
  );
};