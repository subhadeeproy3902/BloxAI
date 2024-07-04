"use client"
import React from 'react'
import Image from "next/image";
import Header from "@/components/shared/Header";
import { Creators } from "@/components/shared/Creators";
import { GlobeDemo } from "@/components/shared/GlobeCard";
import Footer from "@/components/shared/Footer";
import ScrollToTopButton from "@/components/shared/ScrollUp";
import { useEffect, useState } from "react";

interface Contributor {
  html_url: string;
  login: string;
  avatar_url: string;
  contributions: number;
}
export default function Contributors(){
    const [contributorsData, setContributorsData] = useState<Contributor[]>([]); 
    async function fetchContributors(pageNumber = 1) {
     
     const url = `https://api.github.com/repos/subhadeeproy3902/BloxAI/contributors?page=1&per_page=100`;
     const response = await fetch(url);
     if (!response.ok) {
       throw new Error(
         `Failed to fetch contributors data. Status code: ${response.status}`
       );
     }
 
     const contributorsData1 = await response.json();
     console.log(contributorsData1)
     setContributorsData(contributorsData1)
   }
   useEffect(()=>{
 
     fetchContributors()
   },[])
  return (
    <>
         <div className="grid"></div>

<div className="mb-8 text-center">
  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
    Meet Our Contributors
  </h2>
</div>
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
  {contributorsData.map((data, index) => (
    <a
      key={index}
      href={data.html_url}
      target="_blank"
      className="group rounded-lg bg-white p-4 shadow-sm transition-all duration-300 hover:bg-primary/10 hover:shadow-md dark:bg-stone-950 dark:hover:bg-stone-800 dark:shadow-zinc-700 dark:border"
    >
      <div className="relative h-72 md:h-60 overflow-hidden rounded-lg">
        <Image
          alt={data.login}
          className="h-full w-full object-cover object-center group-hover:scale-110 transition-all duration-500"
          src={data.avatar_url}
          width={400}
          height={400}
        />
      </div>
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold">{data.login}</h3><br>
        </br>
        <span className="w-[100%]">Contributions : </span> {data.contributions}
      </div>
    </a>
  ))}
</div>

    </>
  )
}
