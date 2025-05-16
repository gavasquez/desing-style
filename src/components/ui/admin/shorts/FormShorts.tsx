"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Spinner } from "../spinner/Spinner";
import { createShort } from "@/actions/auth/shorts/createShort";
import { YoutubeShorts } from "@prisma/client";
import { TableShorts } from "./TableShorts";

export interface FormInputs {
  shortsUrl: string;
}

interface Props {
  siteId: string;
  shorts: YoutubeShorts[];
}

export const FormShorts = ( { siteId, shorts }: Props ) => {
  const [ loaded, setLoaded ] = useState( false );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormInputs>();

  const [ message, setMessage ] = useState<string>( "" );
  const [ loading, setLoading ] = useState<boolean>( false );

  const onSubmit = async ( data: FormInputs ) => {
    try {
      setLoading( true );
      setMessage( "" );

      const { shortsUrl } = data;

      const formData = new FormData();

      const videoId = getVideoId( shortsUrl );

      if ( !videoId ) {
        setMessage( "URL de video inválida" );
        setTimeout( () => {
          setValue("shortsUrl", "");
          setMessage( "" );
          setLoading(false);
        }, 3000 );
        return;
      }

      formData.append( "shortsUrl", videoId );

      const response = await createShort( formData, siteId );

      if ( response.ok ) {
        setMessage( response.message );
        setValue( "shortsUrl", "" );
        setTimeout( () => {
          setMessage( "" );
        }, 3000 );
      } else {
        setMessage( response.message );
      }
    } catch ( error ) {
      setMessage( "Error al procesar la solicitud" );
    } finally {
      setLoading( false );
    }
  };

  const getVideoId = (url: string): string | null => {
    try {
      const urlObj = new URL(url);
      
      // Caso para YouTube Shorts
      if (urlObj.pathname.includes('/shorts/')) {
        const shortsId = urlObj.pathname.split('/shorts/')[1];
        // Removemos cualquier parámetro adicional que pueda venir después del ID
        return shortsId.split('?')[0];
      }
      
      // Caso para URLs normales de YouTube
      const urlParams = new URLSearchParams(urlObj.search);
      return urlParams.get('v');
    } catch (error) {
      return null;
    }
  };

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
      },
    } );
    Toast.fire( {
      icon: "success",
      title: message,
    } );
  }, [ message ] );

  useEffect( () => {
    setLoaded( true );
  }, [] );

  if ( !loaded ) {
    return <Spinner />;
  }

  return (
    <div className="w-full px-10">
      <form onSubmit={ handleSubmit( onSubmit ) }>
        <h2 className="text-base/7 font-semibold text-gray-900">
          Configuración de los Shorts
        </h2>
        <p className="mt-1 text-sm/6 text-gray-600">
          Aquí puedes configurar los detalles de los Shorts.
        </p>

        { message && <p className="mt-1 text-sm/6 text-indigo-500">{ message }</p> }

        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label
              htmlFor="siteName"
              className="block text-sm/6 font-medium text-gray-900"
            >
              URL del Video de YouTube
            </label>
            <div className="mt-2">
              <input
                type="text"
                id="siteName"
                disabled={ shorts.length >= 6 }
                placeholder="Ingresa la URL del video"
                { ...register( "shortsUrl", { required: true } ) }
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div className="sm:col-span-3 text-end">
            <button
              disabled={ shorts.length >= 6 }
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 hover:text-white transition-all disabled:bg-slate-900 disabled:text-slate-400"
            >
              { loading ? "Cargando..." : "Guardar" }
            </button>
          </div>
        </div>
      </form>
      { shorts.length > 0 && <TableShorts shorts={ shorts } /> }
    </div>
  );
};