'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import type { Service } from './Service';


interface Props {
  isOpen: boolean;
  closeModal: () => void;
  service: Service;
}

export default function Modal( { isOpen, closeModal, service }: Props ) {

  if ( !isOpen ) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-999 p-4"
      onClick={ closeModal }
    >
      <div
        className="bg-white rounded-lg shadow-lg w-11/12 sm:w-auto max-w-lg p-4 sm:p-6 relative"
        onClick={ ( e ) => e.stopPropagation() }
      >
        <button
          onClick={ closeModal }
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        <div className="flex justify-center items-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            { service.title ?? "Título del servicio" }
          </h2>
        </div>

        { service.mediaUrls && service.mediaUrls.length > 0 && (
          <Swiper
            modules={ [ Navigation, Pagination, Autoplay ] }
            navigation={ {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            } }
            pagination={ { clickable: true } }
            autoplay={ { delay: 3000, disableOnInteraction: false } }
            className="relative w-full max-w-[500px] h-[300px] sm:h-[350px] mt-2 mb-4"
          >
            { service.mediaUrls.map( ( mediaUrl, index ) => (
              <SwiperSlide key={ mediaUrl } className="flex justify-center items-center">
                <Image
                  src={ mediaUrl ?? "/uploads/no-image.jpg" }
                  alt={ `Imagen del servicio ${ service.title } ${ index + 1 }` }
                  width={ 500 }
                  height={ 300 }
                  className="w-full h-full object-cover rounded-xl"
                />
              </SwiperSlide>
            ) ) }

            <div className="swiper-button-prev !text-black font-bold"></div>
            <div className="swiper-button-next !text-black font-bold"></div>

            <style jsx>{ `
            .swiper-pagination-bullet {
              background-color: black !important;
              width: 6px;
              height: 6px;
              opacity: 0.7;
            }
            .swiper-pagination-bullet-active {
              background-color: black !important;
              opacity: 1;
            }
          `}</style>
          </Swiper>
        ) }

        <div className="mt-4 flex justify-center">
          <button
            onClick={ closeModal }
            className="px-4 py-2 bg-slate-600 text-white rounded-lg shadow hover:bg-red-600 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
