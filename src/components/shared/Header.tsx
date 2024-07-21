"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import ThemeTogglebutton from "../ui/ThemeToggle";
import { useState } from "react";
import NavLink from "./NavLink";
import { title } from "process";
import { usePathname } from "next/navigation";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };
  const pathname = usePathname();
  const links = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "About",
      path: "/#about",
    },
    {
      title: "Contributors",
      path: "/contributors",
    },
    {
      title: "Contact",
      path: "/#contact",
    },
    {
      title: "Review Us",
      path: "/#review",
    },{
      title: "What's New",
      path:"/version"
    }
  ];
  return (
    <>
      <header className="border-b sticky top-0 z-[99] bg-background/40 backdrop-blur-md">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link className="block text-primary" href="/">
                <span className="sr-only">Home</span>
                <Image
                  src="/android-chrome-512x512.png"
                  alt="Logo"
                  width={50}
                  height={50}
                />
              </Link>
            </div>

            <div className="hidden md:block sm:pl-10 md:pl-40">
              <nav aria-label="Global">
                <ul className="flex items-center gap-6 text-sm">
                  <li className=" space-x-6">
                    {links.map((link, index) => (
                      <Link
                        key={index}
                        className={`transition ${
                          pathname === link.path ? 'text-primary font-bold' : 'text-foreground hover:text-foreground/75'
                        }`}
                        href={link.path}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex gap-4">
                <ThemeTogglebutton />
                <>
                  <Button asChild>
                    <Link href={"/signin"}>Login</Link>
                  </Button>

                  <Button variant="secondary" asChild>
                    <Link href={"/signup"}>Signup</Link>
                  </Button>
                </>
              </div>

              <div className="block md:hidden">
                <Button
                  onClick={handleMenuOpen}
                  variant="secondary"
                  className="p-2"
                >
                  <MenuIcon size={24} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
      {menuOpen && (
        <div
          className="md:hidden sm:block fixed bg-background z-50 w-full h-fit flex flex-col items-center justify-start text-center gap-7 pt-5 pb-5 border-b-2 border-gray-500 top-[4rem]"
          style={{ boxShadow: "inset 0 -10px 10px -10px #7b7575b3" }}
        >
          {links.map((link, index) => (
            <NavLink item={link} key={index} handleMenuOpen={handleMenuOpen} />
          ))}
        </div>
      )}
    </>
  );
};

export default Header;
