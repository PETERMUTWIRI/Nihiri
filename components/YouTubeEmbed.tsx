'use client';

import { useState, useEffect, useRef } from 'react';
import { FaPlay, FaSpinner, FaXmark } from 'react-icons/fa6';
import { MdWarning } from 'react-icons/md';
import { FiExternalLink } from 'react-icons/fi';
import Image from 'next/image';

interface YouTubeEmbedProps {
  videoId: string;
  mini?: boolean;
}

export default function YouTubeEmbed({ videoId, mini = false }: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [thumbError, setThumbError] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Handle ESC key to close expanded modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isExpanded) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isExpanded]);

  const cleanVideoUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;
  const autoplayUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1&autoplay=1&mute=1&loop=1&playlist=${videoId}`;
  
  // Fallback system: maxres → sd → hq → gray background
  const getThumbnailUrl = () => {
    if (thumbError === 2) return null; // Both failed, show gray
    if (thumbError === 1) return `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  const thumbnailUrl = getThumbnailUrl();

  const handlePlay = () => {
    if (mini) {
      setIsExpanded(true);
    } else {
      setIsLoading(true);
      setHasError(false);
      setTimeout(() => {
        setIsPlaying(true);
        setIsLoading(false);
      }, 400);
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
    setIsPlaying(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleThumbError = () => {
    setThumbError(prev => prev + 1);
  };

  // MINI MODE - Small preview with autoplay
  if (mini) {
    return (
      <>
        {/* Mini Preview Container */}
        <div 
          className="relative w-full h-24 sm:h-28 rounded-xl overflow-hidden shadow-lg border-2 border-white/50 cursor-pointer group bg-black"
          onClick={handlePlay}
          role="button"
          aria-label="Watch our story - Click to expand"
        >
          {/* Autoplay iframe (muted) */}
          <iframe
            src={autoplayUrl}
            title="Nihiri Foundation - Our Story Preview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-80"
            style={{ 
              transform: 'scale(1.5)', // Zoom in to hide black bars
              transformOrigin: 'center'
            }}
            referrerPolicy="strict-origin-when-cross-origin"
          />
          
          {/* Dark overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
          
          {/* Content overlay */}
          <div className="absolute inset-0 flex items-center px-4 sm:px-5">
            {/* Play button */}
            <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-white/90 group-hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-lg mr-3 sm:mr-4">
              <FaPlay className="text-cyan-600 text-sm sm:text-base ml-0.5" />
            </div>
            
            {/* Text content */}
            <div className="flex-1 min-w-0">
              <span className="block text-white font-bold text-sm sm:text-base truncate drop-shadow-md">
                Watch Our Story
              </span>
              <span className="block text-white/80 text-xs truncate drop-shadow-md">
                See how we make a difference
              </span>
            </div>
            
            {/* Expand icon */}
            <div className="flex-shrink-0 ml-2 text-white/70 group-hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Expanded Modal */}
        {isExpanded && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={handleClose}
          >
            <div 
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors p-2"
                aria-label="Close video"
              >
                <FaXmark className="text-3xl" />
              </button>
              
              {/* Video container */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black">
                <iframe
                  src={cleanVideoUrl}
                  title="Nihiri Foundation - Our Story"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  onError={handleError}
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
              
              {/* Caption */}
              <p className="text-white/80 text-center mt-4 text-sm">
                Press ESC or click outside to close
              </p>
            </div>
          </div>
        )}
      </>
    );
  }

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
