'use client';
import { createUpdateSettings } from '@/actions/auth/settigns/create-update';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { SketchPicker } from "react-color";
import { EditorTexto } from '../editor/EditorTexto';
import { Spinner } from '../spinner/Spinner';
import { Poppins, Montserrat, Roboto, Open_Sans } from 'next/font/google';

const poppins = Poppins( {
  weight: [ '400', '500', '600', '700' ],
  subsets: [ 'latin' ],
} );

const montserrat = Montserrat( {
  weight: [ '400', '500', '600', '700' ],
  subsets: [ 'latin' ],
} );

const roboto = Roboto( {
  weight: [ '400', '500', '700' ],
  subsets: [ 'latin' ],
} );

const openSans = Open_Sans( {
  weight: [ '300', '400', '600', '700' ],
  subsets: [ 'latin' ],
} );


export interface FormInputs {
  siteName: string;
  emailSite: string;
  siteLogoUrl: File;
  description: string;
  siteColor: string;
  siteColorText: string;
  policyPrivacyText: string;
  googleTagManagerId?: string;
  smtp_gmail_key?: string;
  font_family?: string;
}

interface SiteSettings {
  id: string;
  siteName: string | null;
  emailSite: string | null;
  siteLogoUrl: string | null;
  description: string | null;
  siteColor: string | null;
  siteColorText: string | null;
  googleTagManagerId: string | null;
  policyPrivacyText: string | null;
  font_family: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface Props {
  site?: SiteSettings;
  siteId: string;
}

export const FormSettings = ( { site, siteId }: Props ) => {

  const [ loaded, setLoaded ] = useState( false );
  const { control, register, handleSubmit, setValue } = useForm<FormInputs>();
  const [ message, setMessage ] = useState<string>( '' );
  const [ imagePreview, setImagePreview ] = useState<string | null>( null );
  const [ loading, setLoading ] = useState<boolean>( false );

  /* Colores Sitio y Texto */
  const [ showSiteColorPicker, setShowSiteColorPicker ] = useState( false );
  const [ showTextColorPicker, setShowTextColorPicker ] = useState( false );


  const handleImageChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
    const file = event.target.files?.[ 0 ];

    if ( file ) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview( reader.result as string );
      };
      reader.readAsDataURL( file );
    }
  };

  const onSubmit = async ( data: FormInputs ) => {
    setLoading( true );
    setMessage( '' );

    const { siteName, emailSite, description, siteLogoUrl, googleTagManagerId, siteColor, siteColorText, policyPrivacyText, font_family } = data;

    const formData = new FormData();

    // Guardar la fuente seleccionada
    formData.append( 'font_family', font_family ? font_family : 'Poppins' );

    // Otros campos
    formData.append( 'siteName', siteName );
    formData.append( 'emailSite', emailSite );
    formData.append( 'description', description );
    formData.append( 'siteColor', siteColor ? siteColor : '' );
    formData.append( 'siteColorText', siteColorText ? siteColorText : '' );
    formData.append( 'policyPrivacyText', policyPrivacyText );
    formData.append( 'googleTagManagerId', googleTagManagerId ? googleTagManagerId : '' );

    if ( siteLogoUrl instanceof FileList && siteLogoUrl.length > 0 ) {
      formData.append( "imageUrl", siteLogoUrl[ 0 ] );
    }

    const { message, ok } = await createUpdateSettings( formData, siteId );

    if ( ok ) {
      setMessage( message );
      setTimeout( () => {
        setMessage( '' );
      }, 3000 );
    }

    setLoading( false );
  };


  useEffect( () => {
    if ( site ) {
      setValue( 'siteName', site.siteName ? site.siteName : '' );
      setValue( 'emailSite', site.emailSite ? site.emailSite : '' );
      setValue( 'description', site.description ? site.description : '' );
      setValue( 'siteColor', site.siteColor ? site.siteColor : '' );
      setValue( 'siteColorText', site.siteColorText ? site.siteColorText : '' );
      setValue( 'policyPrivacyText', site.policyPrivacyText ? site.policyPrivacyText : '' );
      setValue( 'googleTagManagerId', site.googleTagManagerId ? site.googleTagManagerId : '' );
      setValue( 'font_family', site.font_family ? site.font_family : 'Poppins' );
      if ( site.siteLogoUrl ) {
        setImagePreview( site.siteLogoUrl );
      }
    }
  }, [] );

  useEffect( () => {
    if ( !message ) return;
    Swal.fire( {
      icon: "success",
      title: message,
      confirmButtonColor: "#3085d6",
      confirmButtonText: 'Ok',
      timer: 3000,
      timerProgressBar: true,
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
      <h2 className="text-base/7 font-semibold text-gray-900">Configuración del Sitio</h2>
      <p className="mt-1 text-sm/6 text-gray-600">Aquí puedes configurar los detalles del sitio.</p>

      { message && <p className="mt-1 text-sm/6 text-indigo-500">{ message }</p> }

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
        {/* Nombre del Sitio */ }
        <div className="sm:col-span-6">
          <label htmlFor="siteName" className="block text-sm/6 font-medium text-gray-900">Nombre del Sitio</label>
          <div className="mt-2">
            <input
              type="text"
              id="siteName"
              placeholder="Ingresa el nombre del sitio"
              { ...register( 'siteName', { required: true } ) }
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        {/* Email del Sitio */ }

        <div className="sm:col-span-6 flex gap-4">

          <div className='w-full sm:w-1/2'>
            <label htmlFor="emailSite" className="block text-sm/6 font-medium text-gray-900">Email del Sitio</label>
            <input
              type="text"
              id="emailSite"
              placeholder="Ingresa el email del sitio"
              { ...register( 'emailSite', { required: true } ) }
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>

          <div className="w-full sm:w-1/2">
            <label htmlFor="googleTagManagerId" className="block text-sm/6 font-medium text-gray-900">Google Tag Manager ID</label>
            <input
              type="text"
              id="googleTagManagerId"
              { ...register( 'googleTagManagerId' ) }
              placeholder="Ingresa el id de Google Tag Manager"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
            />
          </div>
        </div>

        {/* Descripción */ }
        <div className="sm:col-span-6">
          <label htmlFor="description" className="block text-sm/6 font-medium text-gray-900">Descripción</label>
          <div className="mt-2">
            <EditorTexto name="description" control={ control } defaultValue={ site?.description ?? '' } />
          </div>
        </div>

        {/* Logo */ }
        <div className="sm:col-span-3 flex gap-4">
          <div className="w-full">
            <label htmlFor="siteLogoUrl" className="block text-sm/6 font-medium text-gray-900">Logo</label>
            <div className="mt-2">
              <input
                type="file"
                id="siteLogoUrl"
                { ...register( 'siteLogoUrl' ) }
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                accept="image/*"
                onChange={ handleImageChange }
              />
            </div>
          </div>

          <div className="w-[250px] bg-gray-400 p-4 rounded-md flex justify-center items-center text-center">
            { imagePreview ? (
              <img src={ imagePreview } alt="Vista previa" width={ 50 } height={ 50 } />
            ) : (
              <p>No se ha seleccionado ninguna imagen</p>
            ) }
          </div>
        </div>

        <div className="sm:col-span-6 flex gap-4">
          <div className="flex w-full gap-4 items-start">
            {/* Site Color Picker */ }
            <div className="flex-1 relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Color del Sitio</label>
              <Controller
                name="siteColor"
                control={ control }
                render={ ( { field } ) => (
                  <div>
                    <div
                      className="w-full h-9 rounded border cursor-pointer flex items-center justify-center hover:bg-gray-300 border-gray-300"
                      style={ { backgroundColor: field.value } }
                      onClick={ () => setShowSiteColorPicker( !showSiteColorPicker ) }
                    >
                      <span className="text-md text-black">Seleccionar color</span>
                    </div>
                    { showSiteColorPicker && (
                      <div className="absolute z-10 mt-2 w-full">
                        <div
                          className="fixed top-0 left-0 w-full h-full"
                          onClick={ () => setShowSiteColorPicker( false ) }
                        />
                        <SketchPicker
                          color={ field.value }
                          onChange={ ( color ) => field.onChange( color.hex ) }
                        />
                      </div>
                    ) }
                  </div>
                ) }
              />
            </div>

            {/* Text Color Picker */ }
            <div className="flex-1 relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">Color de Texto</label>
              <Controller
                name="siteColorText"
                control={ control }
                render={ ( { field } ) => (
                  <div>
                    <div
                      className="w-full h-9 rounded border cursor-pointer flex items-center justify-center hover:bg-gray-300 border-gray-300"
                      style={ { backgroundColor: field.value } }
                      onClick={ () => setShowTextColorPicker( !showTextColorPicker ) }
                    >
                      <span className="text-md text-black">Seleccionar color</span>
                    </div>
                    { showTextColorPicker && (
                      <div className="absolute z-10 mt-2">
                        <div
                          className="fixed top-0 left-0 w-full h-full"
                          onClick={ () => setShowTextColorPicker( false ) }
                        />
                        <SketchPicker
                          color={ field.value }
                          onChange={ ( color ) => field.onChange( color.hex ) }
                        />
                      </div>
                    ) }
                  </div>
                ) }
              />
            </div>

          </div>
        </div>
        {/* Tipo de Fuente */ }
        <div className="sm:col-span-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Fuente</label>
          <div className="mt-2">
            <select
              id="font_family"
              { ...register( 'font_family' ) }
              className={ `${ poppins.className } block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm` }
            >
              <option value="Poppins">Poppins (recomendado)</option>
              <option value="Montserrat" className={ `${ montserrat.className } text-base` }>Montserrat</option>
              <option value="Roboto" className={ `${ roboto.className } text-base` }>Roboto</option>
              <option value="Open Sans" className={ `${ openSans.className } text-base` }>Open Sans</option>
            </select>

          </div>
        </div>

        <div className="sm:col-span-6">
          <label htmlFor="policyPrivacyText" className="block text-sm/6 font-medium text-gray-900">Políticas de privacidad</label>
          <div className="mt-2">
            <EditorTexto name="policyPrivacyText" control={ control } defaultValue={ site?.policyPrivacyText ?? '' } maxCharacters={ 5000 } />
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