"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useRef } from "react";

interface YoutubeShort {
  id: string;
  shortsUrl: string;
  createdAt: Date;
  updatedAt: Date;
  siteId: string;
}

interface YouTubePlayer {
  destroy?: () => void;
  pauseVideo?: () => void;
  seekTo?: (seconds: number) => void;
  playVideo?: () => void;
}

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        config: {
          events?: {
            onStateChange?: (event: { data: number }) => void;
          };
        }
      ) => YouTubePlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface Props {
  shorts: YoutubeShort[];
  siteColorText: string | undefined | null;
}

export default function YoutubeCarousel({ shorts, siteColorText }: Props) {
  const players = useRef<Record<number, YouTubePlayer>>({});

  const getShortUrl = (videoId: string): string => {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  const getVideoUrl = (videoId: string): string => {
    return `https://www.youtube.com/watch?v=${videoId}`;
  };

  return (
    <div className="container mx-auto mb-10 mt-10">
      <h3
        className="mb-6 text-2xl leading-normal font-medium"
        style={{ color: siteColorText === "#ffffff" ? "#000" : siteColorText! }}
      >
        Explora los Shorts Exclusivos
      </h3>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`relative ${shorts.length === 1 ? "flex justify-center" : ""}`}>
        <div className={`${shorts.length === 1 ? "w-[315px]" : "w-full"} relative`}>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: Math.min(2, shorts.length),
                spaceBetween: 30,
              },
              768: {
                slidesPerView: Math.min(3, shorts.length),
                spaceBetween: 40,
              },
            }}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination",
            }}
            loop={shorts.length > 1}
            direction="horizontal"
            className="mb-8 pb-12"
            onSlideChange={() => {
              Object.values(players.current).forEach((player) => {
                player.pauseVideo?.();
              });
            }}
          >
            {shorts.map((short, index) => (
              <SwiperSlide key={index} className="flex justify-center items-center">
                <div className="relative w-[315px] h-[560px] p-3">
                  
                  <div className="absolute inset-0 bg-gradient-to-b to-gray-200 rounded-xl shadow-lg">
                    
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gray-400 rounded-tl-xl" />
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gray-400 rounded-tr-xl" />
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gray-400 rounded-bl-xl" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gray-400 rounded-br-xl" />
                  </div>
                  
                  <div className="relative h-full w-full p-2">
                    <a
                      href={getVideoUrl(short.shortsUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full h-full relative overflow-hidden rounded-lg transform transition-transform duration-300 hover:scale-[1.02]"
                    >
                      <img
                        src={getShortUrl(short.shortsUrl)}
                        alt={`Imagen del short ${short.shortsUrl}`}
                        className="w-full h-full object-cover rounded-lg shadow-md"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-10 hover:bg-opacity-20 transition-opacity duration-300" />
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            <div className="swiper-pagination !bottom-0" />

            {shorts.length > 1 && (
              <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center pointer-events-none px-2 md:px-4">
                <button 
                  className="swiper-button-prev !static !w-10 !h-10 !mt-0 pointer-events-auto rounded-full bg-white shadow-lg flex items-center justify-center !after:text-black hover:opacity-75 transition-opacity"
                  style={{ 
                    position: 'relative', 
                    margin: '0',
                    '--swiper-navigation-color': siteColorText === '#ffffff' ? '#000' : siteColorText,
                    fontWeight: 900
                  } as React.CSSProperties }
                />
                <button 
                  className="swiper-button-next !static !w-10 !h-10 !mt-0 pointer-events-auto rounded-full bg-white shadow-lg flex items-center justify-center !after:text-black hover:opacity-75 transition-opacity"
                  style={{ 
                    position: 'relative', 
                    margin: '0',
                    '--swiper-navigation-color': siteColorText === '#ffffff' ? '#000' : siteColorText,
                    fontWeight: 900
                  } as React.CSSProperties }
                />
              </div>
            )}
          </Swiper>
        </div>
      </div>
    </div>
    </div>
  );
}
