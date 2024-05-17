import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between gap-8">
          <div className="mb-6 md:mb-0 flex-1">
            <a href="https://blox-ai.vercel.app/" className="flex items-center">
              <Image
              width={500}
              height={500}
                src="/android-chrome-512x512.png"
                className="h-8 w-8 me-3"
                alt="Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Blox AI
              </span>
            </a>
            <p className="mt-8 text-md text-muted-foreground">
            Effortlessly create and share stunning flowcharts and diagrams. Collaborate seamlessly with your team and enjoy secure workspaces. Start visualizing your ideas today!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-6 lg:grid-cols-4">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Quick Links
              </h2>
              <ul className="text-muted-foreground font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    About
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/contributors" className="hover:underline">
                    Contributor
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/contact" className="hover:underline">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/review" className="hover:underline">
                    Review Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-muted-foreground font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/subhadeeproy3902/BloxAI"
                    className="hover:underline "
                    target="_blank"
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a
                    href="https://chat.whatsapp.com/E5oRd1VG1Ov4HoNPq4QcRU"
                    className="hover:underline"
                    target="_blank"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Contact
              </h2>
              <ul className="text-muted-foreground font-medium">
                <li className="mb-4">
                  <a
                    href="https://www.linkedin.com/in/subhadeep3902/"
                    className="hover:underline"
                  >
                    Subhadeep Roy
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://www.linkedin.com/in/anishbiswas777/"
                    className="hover:underline"
                  >
                    Anish Biswas
                  </a>
                </li>
              </ul>
            </div>
            <div className="-mt-20 lg:mt-0">
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-muted-foreground font-medium">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://github.com/subhadeeproy3902/BloxAI/blob/main/LICENSE"
                    className="hover:underline"
                  >
                    License
                  </a>
                </li>
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/subhadeeproy3902/BloxAI/blob/main/CODE_OF_CONDUCT.md"
                    className="hover:underline"
                  >
                    Code Of Conduct
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-stone-300 sm:mx-auto dark:border-neutral-600 lg:my-8" />
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 sm:text-center dark:text-neutral-500">
            © 2024{" "}
            <a href="https://blox-ai.vercel.app/" className="hover:underline">
              BloxAI
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a
              href="https://github.com/subhadeeproy3902/BloxAI"
              className="text-neutral-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="sr-only">GitHub account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
