import React from 'react';
import Image from 'next/image';
import Script from 'next/script';

const Footer: React.FC = () => {
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

          <div className="wrapper col-md-3 col-12" style={{ justifyContent: 'center', display: 'flex' }}>
            <div id="google_element"></div>
            <Script
              src="https://translate.google.com/translate_a/element.js?cb=loadGoogleTranslate"
              strategy="afterInteractive"
            />
            <Script
              id="google-translate"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  function loadGoogleTranslate() {
                    new google.translate.TranslateElement({
                      pageLanguage: 'en'
                    }, 'google_element');
                  }
                `,
              }}
            />
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
                    href="/licensing"
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
                    d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.123c2.107-4.708-0.064-8.602-0.48-9.303c-0.363-0.605-7.654-18.405-10.504-24.737 c-2.14-4.835-4.341-6.991-8.424-6.991c-0.244,0-0.488,0.01-0.732,0.025c-0.297,0.017-0.591,0.035-0.886,0.035 c-2.325,0-4.595-0.351-6.802-0.351c-3.24,0-6.543,1.103-9.939,3.275c-3.736,2.404-7.396,6.08-11.054,10.901 c-7.574,10.038-10.494,20.056-8.671,30.703c4.283,22.847,18.018,43.032,24.486,50.813c0.076,0.091,0.137,0.189,0.213,0.278 c24.801,31.518,42.944,42.715,52.739,46.351c6.056,2.305,11.584,3.697,16.635,3.697c3.918,0,7.584-0.798,10.98-2.372 c10.186-4.637,18.091-16.558,20.493-32.485c0.607-4.095,0.936-8.233,0.936-12.38c0-8.66-3.692-12.805-6.834-14.37 C228.426,177.23,228.164,177.1,227.904,176.981z"
                  />
                  <path
                    id="XMLID_470_"
                    d="M154.062,0.004C69.093,0.004,0.004,69.094,0.004,154.062c0,30.373,8.395,59.731,24.3,85.412L0.004,308 l70.96-23.881c23.976,13.11,51.041,20.032,78.913,20.032c84.968,0,154.058-69.09,154.058-154.059 S239.03,0.004,154.062,0.004z M154.062,277.53c-26.243,0-51.654-7.063-73.97-20.442l-5.303-3.138l-42.133,14.167l13.995-43.01 l-3.108-5.363c-15.217-26.284-23.267-56.336-23.267-87.683c0-95.691,77.859-173.55,173.55-173.55 c95.691,0,173.549,77.859,173.549,173.55C327.611,199.671,249.753,277.53,154.062,277.53z"
                  />
                </g>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/bloxaiofficial"
              className="text-neutral-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                fill="currentColor"
                className="w-4 h-4"
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>LinkedIn</title>
                <path d="M20.451 20.452h-3.554v-5.951c0-1.419-.024-3.243-1.98-3.243-1.981 0-2.283 1.55-2.283 3.146v6.048h-3.554V9h3.413v1.561h.049c.475-.9 1.635-1.85 3.362-1.85 3.594 0 4.255 2.365 4.255 5.445v6.296zM5.337 7.433c-1.144 0-2.07-.928-2.07-2.073 0-1.145.926-2.073 2.07-2.073s2.072.928 2.072 2.073c0 1.145-.928 2.073-2.072 2.073zm1.773 13.019H3.565V9h3.545v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.728v20.543C0 23.227.792 24 1.771 24h20.451C23.204 24 24 23.227 24 22.271V1.728C24 .774 23.204 0 22.225 0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
