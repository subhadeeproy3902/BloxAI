"use client";
import React from 'react';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import ScrollToTopButton from '@/components/shared/ScrollUp';
import Version from '@/components/shared/Version';

const Timeline = () => {
  return (
    <>
      <Header />
      <h1 className="text-4xl font-bold md:text-6xl bg-clip-text text-transparent bg-gradient-to-b from-zinc-50 to-orange-500 bg-opacity-50 text-center p-10">What&apos;s new?</h1>
      <Version />
      <Footer />
      <ScrollToTopButton/>
    </>
  );
};

export default Timeline;
