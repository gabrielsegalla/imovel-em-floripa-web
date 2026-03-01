"use client";

import { useEffect, useState } from "react";

type PropertyGalleryProps = {
  title: string;
  images: string[];
};

export function PropertyGallery({ title, images }: PropertyGalleryProps): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    if (!isLightboxOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        setIsLightboxOpen(false);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % images.length);
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + images.length) % images.length);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [images.length, isLightboxOpen]);

  function handleNextImage(): void {
    setActiveIndex((current) => (current + 1) % images.length);
  }

  function handlePreviousImage(): void {
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  }

  return (
    <section className="space-y-3">
      <button
        type="button"
        onClick={() => setIsLightboxOpen(true)}
        className="block h-[460px] w-full overflow-hidden rounded-2xl bg-slate-100 sm:h-[520px]"
      >
        <img src={images[activeIndex]} alt={`${title} image ${activeIndex + 1}`} className="h-full w-full object-cover" />
      </button>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`overflow-hidden rounded-xl border ${
              activeIndex === index ? "border-[#0A1F44]" : "border-slate-200"
            }`}
          >
            <img src={image} alt={`${title} thumbnail ${index + 1}`} className="h-24 w-full object-cover sm:h-28" />
          </button>
        ))}
      </div>

      {isLightboxOpen ? (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setIsLightboxOpen(false);
            }}
            className="absolute right-4 top-4 rounded-md bg-white/90 px-3 py-1.5 text-sm font-semibold text-slate-900"
          >
            Fechar
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handlePreviousImage();
            }}
            className="absolute left-4 rounded-md bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900"
          >
            ←
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              handleNextImage();
            }}
            className="absolute right-4 rounded-md bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900"
          >
            →
          </button>

          <img
            src={images[activeIndex]}
            alt={`${title} image ${activeIndex + 1}`}
            className="max-h-[90vh] w-auto max-w-[92vw] rounded-xl object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </section>
  );
}
