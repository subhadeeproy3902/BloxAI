"use client";
import React, { useEffect, useRef, useState } from 'react';
import VersionCard from './version';
import { versionData } from './versionData';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';

const gradientClasses = [
  'custom-gradient-3',
  'custom-gradient-4',
  'custom-gradient-1',
  'custom-gradient-2',
];

const Timeline: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setActiveIndex(index);
          } else if (activeIndex === index) {
            setActiveIndex(-1);
          }
        });
      },
      { threshold: 0.5 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [activeIndex]);

  return (
    <>
      <Header />
      <div className="relative w-full h-48 bg-gradient-to-r from-orange-400 via-neon-500 to-red-500 md:h-64">
            <div className="absolute inset-0 flex items-center justify-center text-white">
              <h1 className="text-4xl font-bold md:text-5xl">What's new?</h1>
            </div>
          </div>
      <div className="container mx-auto p-4">
        <div className="relative">          
          {versionData.map((version, index) => (
            <div
              key={index}
              className={`relative pb-24 flex flex-row items-center`}
              //@ts-ignore
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
            >
              <div className="w-full flex flex-col ml-10">
                <div className={`vertical-connector ${index !== versionData.length - 1 ? 'h-full' : ''} bg-gray-300`}></div>
                <VersionCard 
                  {...version} 
                  className={gradientClasses[index % gradientClasses.length]} 
                  isActive={activeIndex === index}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Timeline;
