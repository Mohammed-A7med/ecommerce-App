"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import FristSliderImage from "@/assets/slider_1.jpg";
import SecSliderImage from "@/assets/slider_2.webp";
import ThirdSliderImage from "@/assets/slider_3.webp";
import { Button } from "@/components/ui/button";

// SLIDER DATA
const slides = [
  {
    image: FristSliderImage,
    alt: "Steamed dumplings",
    subtitle: "SUMMER 2025",
    title: "New Arrival Collection",
    align: "left",
  },
  {
    image: SecSliderImage,
    alt: "A delicious, juicy burger",
    subtitle: "NEW SEASON",
    title: "Lookbook Collection",
    align: "right",
  },
  {
    image: ThirdSliderImage,
    alt: "A delicious, spicy curry",
    subtitle: "SUMMER SALE",
    title: "Save Up to 70% Today",
    align: "left",
  },
];

export default function MainSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const currentSlide = slides[currentIndex];

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[85vh] overflow-hidden">
      {/* BACKGROUND IMAGES */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover object-center"
            priority={index === 0}
            sizes="100vw"
          />
        </div>
      ))}

      {/* OVERLAY CONTENT */}
      <div className="relative z-30 h-full flex items-center">
        <div
          className={`
            w-full px-6 sm:px-12 md:px-16 lg:px-32 transition-all duration-700
            ${
              currentSlide.align === "right"
                ? "md:text-right text-center"
                : "md:text-left text-center"
            }
          `}
        >
          <p className="text-white md:text-gray-800 tracking-widest text-xs sm:text-sm font-semibold drop-shadow-lg">
            {currentSlide.subtitle}
          </p>

          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mt-2 sm:mt-3 text-white md:text-gray-800 drop-shadow-lg">
            {currentSlide.title}
          </h1>

          <Button className="mt-4 sm:mt-6 md:mt-8 px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 rounded-full text-sm sm:text-base md:text-lg hover:bg-cyan-500 transition shadow-lg">
            Explore Now
          </Button>
        </div>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 flex justify-center gap-2 sm:gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Slide ${index + 1}`}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all cursor-pointer ${
              index === currentIndex
                ? "bg-gray-800 md:bg-gray-800 scale-125 shadow-lg"
                : "bg-gray-400 md:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}