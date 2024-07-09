import Image from "next/image";
import type { Metadata } from "next";
import Header from "@/components/shared/Header";
import { Creators } from "@/components/shared/Creators";
import { GlobeDemo } from "@/components/shared/GlobeCard";
import Footer from "@/components/shared/Footer";
import ScrollToTopButton from "@/components/shared/ScrollUp";
import Contributors from "@/components/shared/Contributors";

export const metadata: Metadata = {
  title: "Blox AI | Contributors",
  description: "Meet the team and Contributors of Blox AI.",
};

const page = () => {
  return (
    <>
      <Header />

      <section className="py-12 relative overflow-x-hidden">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[510px] rounded-full bg-primary opacity-20 blur-[100px]" />
        <div className="container px-4 md:px-6 max-w-screen-xl mb-10">
          <div className="my-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl lg:7xl">
              Creators
            </h2>
            <Creators />
          </div>

          <Contributors/>
        
        </div>

        <GlobeDemo />
      </section>
      <Footer />
      <ScrollToTopButton/>
    </>
  );
};

export default page;
