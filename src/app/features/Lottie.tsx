"use client";
import React, { useEffect, useRef } from "react";

// Define props for the Lottie animation
interface LottieProps {
  src: string;
  style: React.CSSProperties;
}

// Lottie component to embed the animation
const Lottie: React.FC<LottieProps> = ({ src, style }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically load the lottie-player script
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
    script.async = true;
    script.onload = () => {
      if (ref.current) {
        ref.current.innerHTML = `<lottie-player src="${src}" background="transparent" speed="1" style="width: 100%; height: 100%;" loop autoplay></lottie-player>`;
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [src]);

  return <div ref={ref} style={style}></div>;
};

export default Lottie;
