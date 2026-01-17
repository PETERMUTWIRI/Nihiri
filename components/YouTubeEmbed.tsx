'use client';

import { useState } from 'react';
import { FaPlay, FaSpinner } from 'react-icons/fa6';
import { MdWarning } from 'react-icons/md';
import { FiExternalLink } from 'react-icons/fi';
import Image from 'next/image';

export default function YouTubeEmbed({ videoId }: { videoId: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [thumbError, setThumbError] = useState(0);

  const cleanVideoUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;
  
  // Fallback system: maxres → sd → hq → gray background
  const getThumbnailUrl = () => {
    if (thumbError === 2) return null; // Both failed, show gray
    if (thumbError === 1) return `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  const thumbnailUrl = getThumbnailUrl();

  const handlePlay = () => {
    setIsLoading(true);
    setHasError(false);
    setTimeout(() => {
      setIsPlaying(true);
      setIsLoading(false);
    }, 400);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleThumbError = () => {
    setThumbError(prev => prev + 1);
  };

  // GRAY BACKGROUND FALLBACK (when both thumbnails fail)
  if (!isPlaying && !thumbnailUrl) {
    return (
      <div 
        className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20 cursor-pointer group bg-gray-200"
        onClick={handlePlay}
        role="button"
        aria-label="Play video"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl shadow-lg">
            <FaPlay className="text-black text-xl md:text-2xl ml-1" />
          </div>
          <span className="mt-3 md:mt-4 text-gray-800 font-extrabold text-base md:text-lg">
            WATCH OUR STORY
          </span>
        </div>
      </div>
    );
  }

  // THUMBNAIL PREVIEW
  if (!isPlaying && thumbnailUrl) {
    return (
      <div 
        className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20 cursor-pointer group"
        onClick={handlePlay}
        role="button"
        aria-label="Play video"
      >
        <Image
          src={thumbnailUrl}
          alt="Watch our story"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
          onError={handleThumbError}
          sizes="(max-width: 768px) 100vw, 896px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl shadow-lg">
            <FaPlay className="text-black text-xl md:text-2xl ml-1" />
          </div>
          <span className="mt-3 md:mt-4 text-white font-extrabold text-base md:text-lg tracking-wider drop-shadow-lg">
            WATCH OUR STORY
          </span>
        </div>
        {isLoading && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20">
            <FaSpinner className="text-white text-2xl md:text-3xl animate-spin" />
          </div>
        )}
      </div>
    );
  }

  // VIDEO PLAYER
  if (isPlaying && !hasError) {
    return (
      <div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black">
        <iframe
          src={cleanVideoUrl}
          title="Nihiri Foundation - Our Story"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          onError={handleError}
          onAbort={handleError}
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  // ERROR
  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-red-500/10 border border-red-500/30 rounded-2xl max-w-md mx-auto">
      <MdWarning className="text-red-500 text-4xl" />
      <div className="text-center">
        <p className="text-red-700 font-bold mb-2">Video unavailable</p>
        <p className="text-red-600 text-sm mb-4">This video may have embedding disabled.</p>
      </div>
      <a 
        href={`https://www.youtube.com/watch?v=${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-brand-primary hover:bg-brand-dark text-black px-6 py-3 rounded-full font-extrabold inline-flex items-center gap-2"
      >
        Watch on YouTube <FiExternalLink />
      </a>
    </div>
  );
}