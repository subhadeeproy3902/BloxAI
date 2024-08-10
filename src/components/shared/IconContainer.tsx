"use client";
import React from "react";

import { twMerge } from "tailwind-merge";
import { File } from "lucide-react";
import { motion } from "framer-motion";

export const IconContainer = ({ icon, text, delay }: any) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.2,
        delay: delay ? delay : 0,
      }}
      className={twMerge(
        "relative z-50 flex flex-col items-center justify-center space-y-2"
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl p-3 border border-orange-400/20 bg-secondary/20 shadow-inner">
        {icon || <File className="  h-8 w-8 text-orange-400/75" />}
      </div>
      <div className="hidden rounded-md px-2 py-1 md:block">
        <div className="text-center text-xs font-bold text-gray-400">
          {text || `Efficient Files`}
        </div>
      </div>
    </motion.div>
  );
};

