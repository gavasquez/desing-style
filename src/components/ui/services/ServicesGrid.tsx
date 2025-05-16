'use client';
import type { Service } from './Service';
import Image from 'next/image';
import ContenidoDynamico from '../admin/contenido/DynamicContent';
import { useState } from 'react';
import Modal from './Modal';

interface Props {
  siteColor: string | undefined | null;
  service: Service;
}

export default function ServicesGrid( { service, siteColor }: Props ) {

  const { id, title, description, mediaUrls } = service;

  const [ isOpenModal, setIsOpenModal ] = useState( false );

  const handleClickImage = () => {
    openModal();
  };

  const openModal = () => {
    setIsOpenModal( true );
  };

  const closeModal = () => {
    setIsOpenModal( false );
  };

  return (
    <>
      <div
        className="p-6 transition duration-500 rounded-2xl mt-6 hover:shadow-2xl hover:transition-shadow hover:scale-105 hover:shadow-slate-900/50"
        style={ {
          boxShadow: `0 15px 30px rgba(${ parseInt( ( siteColor || '#000' ).slice( 1, 3 ), 16 ) }, ${ parseInt( ( siteColor || '#000' ).slice( 3, 5 ), 16 ) }, ${ parseInt( ( siteColor || '#000' ).slice( 5, 7 ), 16 ) }, 0.7)`,
        } }
      >
        <div className="flex justify-center items-center">
          <div className="w-48 h-48 bg-indigo-600/5 rounded-xl text-3xl flex justify-center items-center shadow-sm shadow-gray-800">
            { mediaUrls &&
              <Image
                src={ mediaUrls[0] ? mediaUrls[0] : '/uploads/no-image.jpg' }
                alt={ title }
                width={ 192 }
                height={ 192 }
                className="w-full h-full object-cover rounded-xl cursor-pointer"
                onClick={ handleClickImage }
              />
            }
          </div>
        </div>

        <div className="content mt-7">
          <p className="title h5 text-lg font-medium hover:text-indigo-600">{ title }</p>
          <div className="mt-3">
            <ContenidoDynamico text={ description ? description : 'Contenido del servicio' } colorText={ '#212020' } />
          </div>
        </div>
      </div>

      {/* Modal */ }
      <Modal isOpen={ isOpenModal } closeModal={ closeModal } service={ service } />

    </>
  );
}