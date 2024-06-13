import Image from "next/image";
import { ContributorsData } from "./ContributorsData";
import type { Metadata } from "next";
import Header from "@/components/shared/Header";
import { Creators } from "@/components/shared/Creators";
import { GlobeDemo } from "@/components/shared/GlobeCard";
import Footer from "@/components/shared/Footer";
import ScrollToTopButton from "@/components/shared/ScrollUp";

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

          <div className="grid"></div>

          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Meet Our Contributors
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {ContributorsData.map((data, index) => (
              <a
                key={index}
                href={data.github}
                target="_blank"
                className="group rounded-lg bg-white p-4 shadow-sm transition-all duration-300 hover:bg-primary/10 hover:shadow-md dark:bg-stone-950 dark:hover:bg-stone-800 dark:shadow-zinc-700 dark:border"
              >
                <div className="relative h-72 md:h-60 overflow-hidden rounded-lg">
                  <Image
                    alt={data.name}
                    className="h-full w-full object-cover object-center group-hover:scale-110 transition-all duration-500"
                    src={data.imageUrl}
                    width={400}
                    height={400}
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-lg font-semibold">{data.name}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>

        <GlobeDemo />
      </section>
      <Footer />
      <ScrollToTopButton/>
    </>
  );
};

export default page;
