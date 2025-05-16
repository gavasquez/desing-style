'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Spinner } from '../spinner/Spinner';
import { createUpdatedRedesSociales } from '@/actions/auth/redes-sociales/createdUpdatedRedes';


export interface FormInputs {
  facebookUrl: string;
  twitterUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  tiktokUrl: string;
}

interface SiteSettings {
  facebookUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  youtubeUrl: string | null;
  tiktokUrl: string | null;
}

interface Props {
  site?: SiteSettings;
  siteId: string;
}

export const FormRedesSociales = ( { site, siteId }: Props ) => {

  const [ loaded, setLoaded ] = useState( false );
  const { register, handleSubmit, setValue, formState: { errors, isValid } } = useForm<FormInputs>();
  const [ message, setMessage ] = useState<string>( '' );
  const [ loading, setLoading ] = useState<boolean>( false );

  const onSubmit = async ( data: FormInputs ) => {
    setLoading( true );
    setMessage( '' );

    const { facebookUrl, twitterUrl, instagramUrl, linkedinUrl, youtubeUrl, tiktokUrl } = data;

    const formData = new FormData();

    formData.append( "facebookUrl", facebookUrl );
    formData.append( "twitterUrl", twitterUrl );
    formData.append( "instagramUrl", instagramUrl );
    formData.append( "linkedinUrl", linkedinUrl );
    formData.append( "youtubeUrl", youtubeUrl );
    formData.append( "tiktokUrl", tiktokUrl );

    const { message, ok } = await createUpdatedRedesSociales( formData, siteId );

    if ( ok ) {
      setMessage( message );
      setTimeout( () => {
        setMessage( "" );
      }, 3000 );
    }

    setLoading( false );
  };

  useEffect( () => {
    if ( site ) {
      setValue( 'facebookUrl', site.facebookUrl ? site.facebookUrl : '' );
      setValue( 'twitterUrl', site.twitterUrl ? site.twitterUrl : '' );
      setValue( 'instagramUrl', site.instagramUrl ? site.instagramUrl : '' );
      setValue( 'linkedinUrl', site.linkedinUrl ? site.linkedinUrl : '' );
      setValue( 'youtubeUrl', site.youtubeUrl ? site.youtubeUrl : '' );
      setValue( 'tiktokUrl', site.tiktokUrl ? site.tiktokUrl : '' );
    }
  }, [] );

  useEffect( () => {
    if ( !message ) return;
    const Toast = Swal.mixin( {
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: ( toast ) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    } );
    Toast.fire( {
      icon: "success",
      title: message
    } );
  }, [ message ] );

  useEffect( () => {
    setLoaded( true );
  }, [] );

  if ( !loaded ) {
    return <Spinner />;
  }

  return (
    <form onSubmit={ handleSubmit( onSubmit ) } className="w-full px-10">
      <h2 className="text-base/7 font-semibold text-gray-900">Configuración de las Redes Sociales</h2>
      <p className="mt-1 text-sm/6 text-gray-600">Aquí puedes configurar las Urls de las redes sociales del sitio.</p>

      { message && <p className="mt-1 text-sm/6 text-indigo-500">{ message }</p> }

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

        {/* Redes Sociales */ }
        <div className="sm:col-span-6 grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="facebookUrl" className="block text-sm/6 font-medium text-gray-900">Facebook URL</label>
            <input
              type="text"
              id="facebookUrl"
              placeholder="Ingresa la URL de Facebook"
              { ...register( 'facebookUrl' ) }
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="twitterUrl" className="block text-sm/6 font-medium text-gray-900">Twitter URL</label>
            <input
              type="text"
              id="twitterUrl"
              placeholder="Ingresa la URL de Twitter"
              { ...register( 'twitterUrl' ) }
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="instagramUrl" className="block text-sm/6 font-medium text-gray-900">Instagram URL</label>
            <input
              type="text"
              id="instagramUrl"
              placeholder="Ingresa la URL de Instagram"
              { ...register( 'instagramUrl' ) }
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="linkedinUrl" className="block text-sm/6 font-medium text-gray-900">LinkedIn URL</label>
            <input
              type="text"
              id="linkedinUrl"
              placeholder="Ingresa la URL de LinkedIn"
              { ...register( 'linkedinUrl' ) }
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="youtubeUrl" className="block text-sm/6 font-medium text-gray-900">YouTube URL</label>
            <input
              type="text"
              id="youtubeUrl"
              placeholder="Ingresa la URL de YouTube"
              { ...register( 'youtubeUrl' ) }
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="tiktokUrl" className="block text-sm/6 font-medium text-gray-900">TikTok URL</label>
            <input
              type="text"
              id="tiktokUrl"
              placeholder="Ingresa la URL de TikTok"
              { ...register( 'tiktokUrl' ) }
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
        </div>
        {/* Botón de guardar */ }
        <div className="sm:col-span-3 text-end">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 hover:text-white transition-all disabled:bg-slate-900 disabled:text-slate-400"
          >
            { loading ? 'Cargando...' : 'Guardar' }
          </button>
        </div>
      </div>
    </form>

  );
};