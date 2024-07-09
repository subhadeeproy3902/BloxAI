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
              Effortlessly create and share stunning flowcharts and diagrams.
              Collaborate seamlessly with your team and enjoy secure workspaces.
              Start visualizing your ideas today!
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-6 lg:grid-cols-4">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Quick Links
              </h2>
              <ul className="text-muted-foreground font-medium">
                <li className="mb-4">
                  <a href="/aboutus" className="hover:underline">
                    About
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/contributors" className="hover:underline">
                    Contributors
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/contact" className="hover:underline">
                    Contact
                  </a>
                </li>
                <li className="mb-4">
                  <a href="/review" className="hover:underline">
                    Review Us
                  </a>
                </li>
                <li>
                  <a href="/version" className="hover:underline">
                    What&rsquo;s New
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
                  <a href="/privacy" className="hover:underline">
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
                  <a href="/terms_conditions" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
                <li>
                  <a href="/codeofconduct" className="hover:underline">
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
          <div className="flex mt-4 sm:justify-center items-center sm:mt-0">
            <a
              href="https://chat.whatsapp.com/E5oRd1VG1Ov4HoNPq4QcRU"
              className="text-neutral-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                fill="currentColor"
                className="w-4 h-4"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 308 308"
                xmlSpace="preserve"
              >
                <g id="XMLID_468_">
                  <path
                    id="XMLID_469_"
                    d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z"
                  />
                  <path
                    id="XMLID_470_"
                    d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z"
                  />
                </g>
              </svg>
            </a>

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
                  fillRule="evenodd"
                  d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                  clipRule="evenodd"
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
