"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { getPropertyImage } from "@/lib/utils";

const ImagePreviews = ({ images }: ImagePreviewsProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePrev = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
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
    <div className="relative h-[450px] w-full">
      {images.map((image, index) => (
        <div
          key={image}
          className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={getPropertyImage(image)}
            alt={`Property Image ${index + 1}`}
            fill
            priority={index == 0}
            className="object-cover cursor-pointer transition-transform duration-500 ease-in-out"
            onClick={() => setIsPreviewOpen(true)}
          />
        </div>
      ))}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-primary-700 bg-opacity-50 p-2 rounded-full focus:outline-none focus:ring focus:ring-secondary-300"
        aria-label="Previous image"
      >
        <ChevronLeft className="text-white" />
      </button>
      {isPreviewOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-10"
          role="dialog"
          aria-modal="true"
          aria-label="Property image preview"
          onClick={() => setIsPreviewOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsPreviewOpen(false)}
            className="absolute right-5 top-5 z-10 rounded-full bg-white/15 p-2 text-white hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Close image preview"
          >
            <X className="h-7 w-7" />
          </button>
          <button
            type="button"
            onClick={(event) => { event.stopPropagation(); handlePrev(); }}
            className="absolute left-4 z-10 rounded-full bg-white/15 p-3 text-white hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white sm:left-8"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <div className="relative h-full w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <Image
              src={getPropertyImage(images[currentImageIndex])}
              alt={`Property Image ${currentImageIndex + 1} of ${images.length}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <button
            type="button"
            onClick={(event) => { event.stopPropagation(); handleNext(); }}
            className="absolute right-4 z-10 rounded-full bg-white/15 p-3 text-white hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white sm:right-8"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
          <span className="absolute bottom-5 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
            {currentImageIndex + 1} / {images.length}
          </span>
        </div>
      )}
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-primary-700 bg-opacity-50 p-2 rounded-full focus:outline-none focus:ring focus:ring-secondary-300"
        aria-label="Next image"
      >
        <ChevronRight className="text-white" />
      </button>
    </div>
  );
};

export default ImagePreviews;
