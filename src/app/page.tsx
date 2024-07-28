"use client";
import { FollowingPointerDemo } from "@/components/shared/FollowingCard";
import { Hero } from "@/components/shared/Hero";
import { AnimatedTooltipPreview } from "@/components/shared/TooltipSection";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import ScrollToTopButton from "@/components/shared/ScrollUp";
import Lenis from "@studio-freight/lenis";
import { useEffect } from "react";
import About from "@/components/shared/About";
import Features from "@/components/shared/Features";
import Review from "@/components/shared/customerreviews";
import Contact from "@/components/shared/contactform";
import FAQ from "@/components/shared/FAQ";
export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  return (
    <>
      <div className="relative">
        <Header />
        <Hero />
        <AnimatedTooltipPreview />
        <FollowingPointerDemo />
        <div id="about" className="relative">
          <About />
          <Features />
        </div>
        <Review />
        <div className="flex w-full flex-col items-center justify-between pt-10" id="contact">
          <Contact />
        </div>
        <FAQ />
      </div>
      <Footer />
      <ScrollToTopButton />
    </>
  );
}
