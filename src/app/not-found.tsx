"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Custom404 = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-screen dark:bg-black  relative">
      <div className="relative w-1/2 max-w-md mx-auto">
        <Image
          src="/404.png"
          alt="Background Image"
          width={500}
          height={500}
          className="object-contain"
        />
      </div>
      <button
        onClick={() => router.push('/')}
        className="mt-6 px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
      >
        Go Back to Home Page
      </button>
    </div>
  );
};

export default Custom404;
