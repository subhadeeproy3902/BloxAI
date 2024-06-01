"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { Github } from "lucide-react";
import { Button } from "../ui/button";


export function Creators() {
  return (
    <div className="container grid px-1 md:grid-cols-2 md:px-6">
      <CardContainer>
        <CardBody className="relative group/card  hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-zinc-800 backdrop-blur bg-opacity-20 border-black/[0.3] w-auto sm:w-[30rem] h-auto rounded-lg p-6 ">
          <CardItem translateZ="50" className="text-xl font-bold text-neutral-900 dark:text-zinc-100">
            Anish Biswas
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-sm text-left max-w-sm mt-2 text-gray-700 dark:text-zinc-300"
          >
            Loves football, Music production and making the darkest jokes.
            He&apos;s him. Literally.
          </CardItem>
          <CardItem translateZ="100" rotateX={-5} className="w-full mt-6">
            <Image
              src="https://lazor.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fanish.webp&w=750&q=75"
              height="700"
              width="700"
              className="h-80 w-full object-cover rounded-lg group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-between items-center mt-20">
            <CardItem
              translateZ={20}
              translateX={-40}
              as="button"
              className="text-xs font-normal dark:text-white"
            >
              <Button variant="ghost" asChild>
                <a
                  href="https://anish-portfolio-blush.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Know More →
                </a>
              </Button>
            </CardItem>
            <CardItem
              translateZ={20}
              translateX={40}
              as="button"
              className="px-4 py-2 rounded-md bg-primary text-white text-xs font-bold"
            >
              <a
                title="Github"
                href="https://git.new/anish"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 items-center"
              >
                Github <Github size={20} />
              </a>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
      <CardContainer>
        <CardBody className="relative group/card  hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-zinc-800 backdrop-blur bg-opacity-20 border-black/[0.3] w-auto sm:w-[30rem] h-auto rounded-lg p-6 ">
          <CardItem translateZ="50" className="text-xl font-bold text-neutral-900 dark:text-zinc-100">
            Subhadeep Roy
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-sm max-w-sm mt-2 text-gray-700 dark:text-zinc-300 text-left"
          >
            Highly frank ,fueled with enthusiasm and a connoisseur of greatness.
            Loves anime and playing chess.
          </CardItem>
          <CardItem translateZ="100" rotateX={-5} className="w-full mt-6">
            <Image
              src="https://lazor.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fsubha.webp&w=750&q=75"
              height="700"
              width="700"
              className="h-80 w-full object-cover rounded-lg group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-between items-center mt-20">
            <CardItem
              translateZ={20}
              translateX={-40}
              as="button"
              className="text-xs font-normal dark:text-white"
            >
              <Button variant="ghost" asChild>
                <a
                  href="https://subhadeep3902-github-io.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Know More →
                </a>
              </Button>
            </CardItem>
            <CardItem
              translateZ={20}
              translateX={40}
              as="button"
              className="px-4 py-2 rounded-md bg-primary text-white text-xs font-bold"
            >
              <a
                href="https://git.new/subha"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-2 items-center"
              >
                Github <Github size={20} />
              </a>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}
