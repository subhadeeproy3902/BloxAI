"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import ThemeTogglebutton from "../ui/ThemeToggle";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="dark:bg-background border-b sticky">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="block text-primary" href="/">
              <span className="sr-only">Home</span>
              <Image
                src="/android-chrome-512x512.png"
                alt=""
                width={50}
                height={50}
              />
            </Link>
          </div>

          <div className="hidden md:block sm:pl-40">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="transition text-foreground hover:text-foreground/75"
                    href="/"
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    className="transition text-foreground hover:text-foreground/75"
                    href="/contributors"
                  >
                    Contributors
                  </Link>
                </li>

                <li>
                  <Link
                    className="transition text-foreground hover:text-foreground/75"
                    href="/"
                  >
                    Contact
                  </Link>
                </li>

                <li>
                  <Link
                    className="transition text-foreground hover:text-foreground/75"
                    href="/review"
                  >
                    Reviews
                  </Link>
                </li>

                <li>
                  <a
                    rel="no-referrer noopener"
                    className="transition text-foreground hover:text-foreground/75"
                    href="https://github.com/subhadeeproy3902/BloxAI"
                    target="_blank"
                  >
                    Github
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-4">
              <ThemeTogglebutton />
              <Button asChild>
                <LoginLink>Login</LoginLink>
              </Button>

              <div className="hidden sm:flex">
                <Button variant="secondary" asChild>
                  <RegisterLink>Sign up</RegisterLink>
                </Button>
              </div>
            </div>

            <div className="block md:hidden">
              <Button variant="secondary" className="p-2">
                <MenuIcon size={24} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
