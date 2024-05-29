import Image from 'next/image'
import React from 'react'

type Props={
    image:any;
}

export default function UserImage({image}:Props) {
  return (
    <div className="flex items-center justify-center w-full">
        <Image
          src={image || "https://picsum.photos/50"}
          alt="user"
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
  )
}
