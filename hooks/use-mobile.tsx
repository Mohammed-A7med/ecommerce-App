"use client";

import { useEffect, useState } from "react";



export function useIsMobile(breakpoint: number = 768) {
  const query = `(max-width: ${breakpoint}px)`;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = () => setIsMobile(mediaQuery.matches);
    handleChange(); 

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return isMobile;
}
