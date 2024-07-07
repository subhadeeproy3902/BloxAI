"use client";
import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import preloaderAnimation from "../ui/Preloader.json";

const Preloader: React.FC = () => {
  const [fadeIn, setFadeIn] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      setFadeIn(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timeout);
  }, []);

  if (!loading) return null;

  return (
    <>
      <style>{`
        .preloader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #ffffff;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          z-index: 9999;
          transform: translate3d(0, 0, 0);
        }
        
        .preloader-animation {
          width: 150px;
          height: 150px;
        }
        
        .preloader.fade-in {
          opacity: 1;
        }
        
        .preloader.fade-out {
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease-in-out;
        }
      `}</style>
      <div className={`preloader ${fadeIn ? "fade-in" : "fade-out"}`}>
        <Lottie className="preloader-animation" animationData={preloaderAnimation} />
      </div>
    </>
  );
};

export default Preloader;
