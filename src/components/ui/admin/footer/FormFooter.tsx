"use client";
import { createUpdateFooter } from '@/actions/auth/footer/create-update';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { Spinner } from '../spinner/Spinner';


export interface FormInputs {
  address: string;
  phoneNumber: string;
  map_iframe: string;
}

interface Footer {
  id: string;
  address: string;
  phoneNumber: string;
  map_iframe: string | undefined | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Props {
  footer?: Footer;
  siteId: string;
}

export const FormFooter = ( { footer, siteId }: Props ) => {

  const [ loaded, setLoaded ] = useState( false );

  const { register, handleSubmit, formState: { errors, isValid }, setValue } = useForm<FormInputs>();

  const [ message, setMessage ] = useState<string>( "" );
  const [ loading, setLoading ] = useState<boolean>( false );

  const onSubmit = async ( data: FormInputs ) => {
    setLoading( true );
    setMessage( "" );

    const { address, phoneNumber, map_iframe } = data;

    const formData = new FormData();

    formData.append( "address", address );
    formData.append( "phoneNumber", phoneNumber );
    formData.append( "map_iframe", map_iframe );

    const { message, ok } = await createUpdateFooter( formData, siteId );

    if ( ok ) {
      setMessage( message );
      setTimeout( () => {
        setMessage( "" );
      }, 3000 );
    }
    setLoading( false );
  };

  useEffect( () => {
    if ( footer ) {
      setValue( "address", footer.address );
      setValue( "phoneNumber", footer.phoneNumber );
      setValue( "map_iframe", footer.map_iframe ? footer.map_iframe : '' );
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

    <form onSubmit={ handleSubmit( onSubmit ) } className="w-full px-10">
      <h2 className="text-base/7 font-semibold text-gray-900">Configuración pie de página</h2>
      <p className="mt-1 text-sm/6 text-gray-600">Aca puedes configurar los detalles de la pie de página.</p>

      { message && <p className="mt-1 text-sm/6 text-indigo-500">{ message }</p> }

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

        <div className="sm:col-span-3">
          <label htmlFor="siteName" className="block text-sm/6 font-medium text-gray-900">Dirección</label>
          <div className="mt-2">
            <input
              type="text"
              id="siteName"
              placeholder="Ingresa la dirección"
              { ...register( 'address' ) }
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">Telefono</label>
          <div className="mt-2">
            <input
              type="text"
              id="siteName"
              placeholder="Ingresa el numero de telefono"
              { ...register( 'phoneNumber' ) }
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
        </div>
        {/* Campo de texto para el iframe de Google Maps */}
        <div className="sm:col-span-3">
          <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">Iframe de Google Maps</label>
          <div className="mt-2">
            <input
              type="text"
              id="siteName"
              placeholder="Ingresa el iframe de Google Maps"
              { ...register( 'map_iframe' ) }
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>  
        </div>

        <div className="sm:col-span-3 text-end">
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 hover:text-white transition-all disabled:bg-slate-900 disabled:text-slate-400">
            {
              loading
                ? "Cargando..."
                : "Guardar"
            }
          </button>
        </div>
      </div>
    </form>
  );
};