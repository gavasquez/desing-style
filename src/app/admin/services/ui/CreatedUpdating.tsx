"use client";
import { createUpdateService } from "@/actions/auth/services/create-update";
import EditorTexto from '@/components/ui/admin/editor/EditorTexto';
import { redirect } from 'next/navigation';
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

interface FormInputs {
  title: string;
  description: string;
  mediaUrls: FileList;
}

interface Service {
  id: string;
  title: string;
  description: string;
  mediaUrls: string[];
  siteId: string;
}

interface Props {
  service: Service | null | undefined;
  serviceSettingsId: string;
}

export const CreatedUpdating = ( { service, serviceSettingsId }: Props ) => {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();

  const [ message, setMessage ] = useState<string>( "" );
  const [ imagePreviews, setImagePreviews ] = useState<string[]>( [] );
  const [ loading, setLoading ] = useState<boolean>( false );

  const handleImageChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    const files = event.target.files;
    if ( files ) {
      const MAX_SIZE = 1 * 1024 * 1024;
      const images: string[] = [];

      for ( let i = 0; i < files.length; i++ ) {
        if ( files[ i ].size > MAX_SIZE ) {
          return Swal.fire( "Opsss", "Una de las imágenes es demasiado grande.", "error" );
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreviews( ( prev ) => [ ...prev, reader.result as string ] );
        };
        reader.readAsDataURL( files[ i ] );
      }
    }
  };

  const onSubmit = async ( data: FormInputs ) => {
    setLoading( true );
    setMessage( "" );

    const { title, description, mediaUrls } = data;

    const formData = new FormData();
    if ( service ) {
      formData.append( "id", service.id );
    }

    formData.append( "title", title );
    formData.append( "description", description );

    if ( mediaUrls && mediaUrls.length > 0 ) {
      Array.from( mediaUrls ).forEach( ( file ) => {
        formData.append( "mediaUrls", file ); // Asegurar que se agregan todas las imágenes
      } );
    }

    const { message, ok } = await createUpdateService( formData, serviceSettingsId );

    if ( ok ) {
      setMessage( message );
      setTimeout( () => {
        setMessage( "" );
      }, 3000 );
      redirect( "/admin/services" );
    }
    setLoading( false );
  };

  useEffect( () => {
    if ( service ) {
      setValue( "title", service.title ? service.title : "Titulo del Servicio" );
      setValue(
        "description",
        service.description ? service.description : "Descripción del Servicio"
      );
      if ( service.mediaUrls ) {
        setImagePreviews( service.mediaUrls );
      }
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

  return (
    <form onSubmit={ handleSubmit( onSubmit ) } className="w-full px-10">
      <h2 className="text-base/7 font-semibold text-gray-900">Servicio</h2>
      <p className="mt-1 text-sm/6 text-gray-600">
        Aca puedes configurar la información sobre servicio.
      </p>

      { message && <p className="mt-1 text-sm/6 text-indigo-500">{ message }</p> }

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        <div className="sm:col-span-3">
          <label
            htmlFor="title"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Titulo
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="title"
              placeholder="Ingresa el titulo"
              { ...register( "title", { required: true } ) } // register
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="description"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Descripción
          </label>
          <div className="mt-2">
            <EditorTexto name="description" control={ control } defaultValue={ service?.description } maxCharacters={ 1500 } />
          </div>
        </div>

        <div className="sm:col-span-3">
          <div className="w-full">
            <label
              htmlFor="siteLogoUrl"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Imagen
            </label>
            <div className="mt-2">
              <input
                type="file"
                id="mediaUrls"
                { ...register( "mediaUrls" ) }
                onChange={ handleImageChange }
                multiple // Permite seleccionar varias imágenes
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                accept="image/*"
              />

            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          { imagePreviews.length > 0 ? (
            imagePreviews.map( ( src, index ) => (
              <img
                key={ index }
                src={ src }
                alt={ `Vista previa ${ index + 1 }` }
                className="object-contain w-full h-full rounded-md"
              />
            ) )
          ) : (
            <p>No se han seleccionado imágenes</p>
          ) }
        </div>


        <div className="sm:col-span-3 text-end">
          <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-600 hover:text-white transition-all disabled:bg-slate-900 disabled:text-slate-400">
            { loading ? "Cargando..." : "Guardar" }
          </button>
        </div>
      </div>
    </form>
  );
};
