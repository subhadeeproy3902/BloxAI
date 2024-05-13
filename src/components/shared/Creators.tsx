"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Link from "next/link";

export function Creators() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 ">
      <CardContainer>
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            Anish Biswas
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 text-start"
          >
            Loves football, Music production and making the darkest jokes.
            He&apos;s him. Literally.
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src="https://lazor.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fanish.webp&w=750&q=75"
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-between items-center mt-20">
            <CardItem
              translateZ={20}
              as={Link}
              href="https://git.new/anish"
              target="__blank"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Github
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>

      <CardContainer>
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            Subhadeep Roy
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300 text-start"
          >
            Highly frank ,fueled with enthusiam and a connoisseur of greatness.
            Loves anime and playing chess.
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src="https://lazor.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fsubha.webp&w=750&q=75"
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-between items-center mt-20">
            <CardItem
              translateZ={20}
              as={Link}
              href="https://git.new/subha"
              target="__blank"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Github
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}
