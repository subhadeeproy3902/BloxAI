import React from 'react'
import AboutUs from '@/components/shared/AboutUs'
import Header from "@/components/shared/Header";
import { Creators } from '@/components/shared/Creators';
import Footer from '@/components/shared/Footer';

function page() {
  return (
    <>

      <Header/>
    <section className="py-12 relative overflow-x-hidden">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[510px] rounded-full bg-primary opacity-20 blur-[100px]" />
        <div className="container px-4 md:px-6 max-w-screen-xl mb-10"></div>
      <div className="flex w-full flex-col items-center justify-between">
        <AboutUs/>

        <div className="my-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-6xl lg:7xl">
              Creators
            </h2>
            <Creators />
          </div>
      </div>
  
</section>
<Footer />
    </>
  )
}

export default page;