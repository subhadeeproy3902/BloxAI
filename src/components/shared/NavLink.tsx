"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
const NavLink = ({ item, handleMenuOpen }:any) => {
    const pathName = usePathname();
    const handleClick = () => {
        handleMenuOpen(); 
      };
  return (
    <Link
    onClick={handleClick}
    href={item.path}
    className={` min-w-[100px] p-2 hover:bg-secondary md:hover:bg-none rounded-md font-medium items-center  ${
      pathName === item.path && " text-white  bg-orange-500"
    }`}
  >
    {item.title}
  </Link>
  )
}

export default NavLink