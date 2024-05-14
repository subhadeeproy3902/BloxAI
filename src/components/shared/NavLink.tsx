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
    className={` min-w-[100px] p-2 rounded-md font-medium items-center  ${
      pathName === item.path && " text-black bg-white"
    }`}
  >
    {item.title}
  </Link>
  )
}

export default NavLink