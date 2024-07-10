// src/ScrollToTopButton.js

"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`fixed bottom-5 right-5 z-50 ${isVisible ? 'block' : 'hidden'}`}>
      <Button
        className="scroll-top-button bg-black dark:bg-secondary text-white p-2 rounded-full opacity-75 hover:opacity-90 hover:bg-gray-800 dark:hover:bg-gray-700"
        onClick={goToTop}
        variant={"secondary"}
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="white" className="arrow">
          <path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" />
        </svg>
      </Button>
    </div>
  );
};

export default ScrollToTopButton;
