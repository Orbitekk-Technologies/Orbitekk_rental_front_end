"use client";

import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { getPropertyImage } from "@/lib/utils";

const GRID_POSITIONS = [
  "md:col-start-2 md:col-span-2 md:row-span-2",
  "md:col-start-1 md:row-start-1",
  "md:col-start-1 md:row-start-2",
  "md:col-start-4 md:row-start-1",
  "md:col-start-4 md:row-start-2",
];

const ImagePreviews = ({ images }: ImagePreviewsProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const gridImages = images.slice(0, 5);

  const openPreview = (index: number) => {
    setCurrentImageIndex(index);
    setIsPreviewOpen(true);
  };
  const handlePrev = useCallback(() => {
    setCurrentImageIndex((index) => (index === 0 ? images.length - 1 : index - 1));
  }, [images.length]);
  const handleNext = useCallback(() => {
    setCurrentImageIndex((index) => (index === images.length - 1 ? 0 : index + 1));
  }, [images.length]);

  useEffect(() => {
    if (!isPreviewOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsPreviewOpen(false);
      if (event.key === "ArrowLeft") handlePrev();
      if (event.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPreviewOpen, handleNext, handlePrev]);

  return (
    <>
      <section className="mx-auto w-full max-w-[1536px] px-4 pt-4 sm:px-6 md:px-10 md:pt-7">
        <div className="relative h-[310px] overflow-hidden rounded-xl md:grid md:h-[445px] md:grid-cols-4 md:grid-rows-2 md:gap-3 md:overflow-visible md:rounded-none">
          {images.map((image, index) => (
            <button
              key={`mobile-${image}-${index}`}
              type="button"
              onClick={() => openPreview(index)}
              className={`absolute inset-0 overflow-hidden rounded-xl md:hidden ${index === currentImageIndex ? "block" : "hidden"}`}
              aria-label={`Open property image ${index + 1} of ${images.length}`}
            >
              <Image src={getPropertyImage(image)} alt={`Property image ${index + 1}`} fill priority={index === 0} sizes="100vw" className="object-cover" />
            </button>
          ))}
          {gridImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => openPreview(index)}
              className={`${GRID_POSITIONS[index]} group relative hidden overflow-hidden rounded-xl md:block`}
              aria-label={`Open property image ${index + 1} of ${images.length}`}
            >
              <Image
                src={getPropertyImage(image)}
                alt={`Property image ${index + 1}`}
                fill
                priority={index === 0}
                sizes={index === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 100vw"}
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </button>
          ))}

          {images.length > 1 && (
            <>
              <button type="button" onClick={handlePrev} className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white md:hidden" aria-label="Previous image">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button type="button" onClick={handleNext} className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white md:hidden" aria-label="Next image">
                <ChevronRight className="h-5 w-5" />
              </button>
              <button type="button" onClick={() => openPreview(0)} className="absolute bottom-3 right-3 z-10 hidden items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-900 shadow md:flex">
                <Images className="h-4 w-4" />
                View all {images.length} photos
              </button>
            </>
          )}
        </div>
      </section>

      {isPreviewOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-10" role="dialog" aria-modal="true" aria-label="Property image preview" onClick={() => setIsPreviewOpen(false)}>
          <button type="button" onClick={() => setIsPreviewOpen(false)} className="absolute right-5 top-5 z-10 rounded-full bg-white/15 p-2 text-white hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white" aria-label="Close image preview">
            <X className="h-7 w-7" />
          </button>
          {images.length > 1 && (
            <button type="button" onClick={(event) => { event.stopPropagation(); handlePrev(); }} className="absolute left-4 z-10 rounded-full bg-white/15 p-3 text-white hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white sm:left-8" aria-label="Previous image">
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}
          <div className="relative h-full w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <Image src={getPropertyImage(images[currentImageIndex])} alt={`Property image ${currentImageIndex + 1} of ${images.length}`} fill sizes="100vw" className="object-contain" />
          </div>
          {images.length > 1 && (
            <button type="button" onClick={(event) => { event.stopPropagation(); handleNext(); }} className="absolute right-4 z-10 rounded-full bg-white/15 p-3 text-white hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white sm:right-8" aria-label="Next image">
              <ChevronRight className="h-8 w-8" />
            </button>
          )}
          <span className="absolute bottom-5 rounded-full bg-black/50 px-3 py-1 text-sm text-white">{currentImageIndex + 1} / {images.length}</span>
        </div>
      )}
    </>
  );
};

export default ImagePreviews;
