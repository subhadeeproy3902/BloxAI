import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-950">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="block text-teal-600" href="/">
              <span className="sr-only">Home</span>
              <Image src="/blox.webp" alt="" width={30} height={30} />
            </Link>
          </div>

          <div className="hidden md:block">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-sm">
                <li>
                  <Link
                    className="transition text-white hover:text-white/75"
                    href="/"
                  >
                    About
                  </Link>
                </li>

                <li>
                  <Link
                    className="transition text-white hover:text-white/75"
                    href="/"
                  >
                    Careers
                  </Link>
                </li>

                <li>
                  <Link
                    className="transition text-white hover:text-white/75"
                    href="/"
                  >
                    History
                  </Link>
                </li>

                <li>
                  <Link
                    className="transition text-white hover:text-white/75"
                    href="/"
                  >
                    Services
                  </Link>
                </li>

                <li>
                  <Link
                    className="transition text-white hover:text-white/75"
                    href="/"
                  >
                    Projects
                  </Link>
                </li>

                <li>
                  <Link
                    className="transition text-white hover:text-white/75"
                    href="/"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <Link
                className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-teal-500"
                href="/"
              >
                Login
              </Link>

              <div className="hidden sm:flex">
                <Link
                  className="rounded-md px-5 py-2.5 text-sm font-medium bg-gray-800 text-white hover:text-white/75"
                  href="/"
                >
                  Register
                </Link>
              </div>
            </div>

            <div className="block md:hidden">
              <button className="rounded p-2 transition bg-gray-800 text-white hover:text-white/75">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
