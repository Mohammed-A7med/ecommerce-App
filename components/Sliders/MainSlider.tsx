"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

import FristSliderImage from "@/assets/slider_1.jpg";
import SecSliderImage from "@/assets/slider_2.webp";
import ThirdSliderImage from "@/assets/slider_3.webp";

const images = [
  { image: FristSliderImage, alt: "A Frist Slider Image" },
  { image: SecSliderImage, alt: "A Sec Slider Image" },
  { image: ThirdSliderImage, alt: "A Third Slider Image" },
];

export default function MainSlider() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [currentImageIndex]);

  const isSecImage = images[currentImageIndex].image === SecSliderImage;

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden group">
      {/* BACKGROUND IMAGES */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={img.image}
            alt={img.alt}
            fill
            priority={index === 0}
            className="
              object-cover 
              md:object-center 
              object-[center_top] 
            "
          />
        </div>
      ))}

      {/* OVERLAY CONTENT */}
      <div className="relative z-30 h-full flex items-center">
        <div
          className={`
            transition-all duration-700 px-6 md:px-0
            w-full md:w-3/4 mx-auto
            ${
              isSecImage
                ? "md:text-right md:ml-auto text-center"
                : "text-center md:text-left"
            }
          `}
        >
          <p className="text-gray-400 ps-1 md:text-gray-600 tracking-widest text-sm font-semibold drop-shadow">
            {isSecImage ? "NEW SEASON" : "SUMMER 2025"}
          </p>

          <h1 className="text-3xl md:text-6xl font-bold leading-tight mt-3 text-white md:text-black drop-shadow-lg">
            {isSecImage ? "Lookbook Collection" : "New Arrival Collection"}
          </h1>

          <Button
            className="
              mt-6 md:mt-10 px-8 py-4 md:px-10 md:py-6 
              rounded-full text-md md:text-lg
            "
          >
            Explore Now
          </Button>
        </div>
      </div>

      {/* DOTS */}
      <div className="absolute bottom-6 md:bottom-8 left-0 right-0 flex justify-center gap-3 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all ${
              index === currentImageIndex
                ? "bg-white md:bg-black scale-125 shadow"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}