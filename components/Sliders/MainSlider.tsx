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
    <div className="relative w-full h-[85vh] overflow-hidden group">
      {/* BACKGROUND IMAGES */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1200 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}

      {/* OVERLAY CONTENT */}
      <div className="relative z-30 h-full flex items-center">
        <div
          className={`
            w-3/4 mx-auto transition-all duration-700
            ${
              currentSlide.align === "right"
                ? "text-right ml-auto"
                : "text-left"
            }
          `}
        >
          <p className="text-gray-800 tracking-widest text-sm font-semibold ps-1">
            {currentSlide.subtitle}
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mt-3 text-gray-800">
            {currentSlide.title}
          </h1>

          <Button className="mt-8 px-10 py-6 rounded-full text-lg hover:bg-cyan-500 transition">
            Explore Now
          </Button>
        </div>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? "bg-gray-800 scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
