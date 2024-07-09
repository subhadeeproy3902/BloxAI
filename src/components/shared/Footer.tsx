import React from 'react';
import Image from 'next/image';

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
            <script src="https://translate.google.com/translate_a/element.js?cb=loadGoogleTranslate"></script>
            <script
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
                    d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.123c2.107-4.708-0.064-8.602-0.48-9.303c-0.363-0.605-7.654-18.405-10.504-24.737 c-2.14-4.835-4.341-6.991-8.424-6.991c-0.244,0-0.488,0.01-0.732,0.025c-0.297,0.017-0.591,0.035-0.886,0.035 c-2.325,0-4.595-0.351-6.754-1.061c-1.292-0.44-2.62-0.661-3.957-0.661c-3.225,0-6.235,1.053-8.438,3.046 c-2.14,1.928-4.091,5.235-5.507,9.056c-3.305,9.08-4.548,20.158-3.53,31.487c1.416,15.595,7.228,31.756,16.546,45.918 c7.636,11.482,17.514,21.603,29.05,29.915c11.241,8.051,24.318,14.342,37.605,18.22c9.061,2.652,17.724,3.996,25.812,3.996 c8.059,0,15.458-1.324,21.982-3.934c6.062-2.399,11.253-6.588,15.31-12.431c1.528-2.148,2.944-4.614,4.157-7.33 c0.934-2.013,1.592-3.327,2.292-4.747c2.317-4.699,0.284-9.974-4.669-12.309C231.475,178.859,228.91,177.613,227.904,176.981z"
                  />
                  <path
                    id="XMLID_470_"
                    d="M154.001,0.004C68.804,0.004,0,68.798,0,153.995c0,27.213,7.154,53.919,20.738,77.394 l-13.683,63.596c-0.656,3.053,0.315,6.239,2.515,8.439c2.201,2.2,5.387,3.171,8.438,2.515l63.6-13.689 c23.471,13.582,50.175,20.732,77.391,20.732c85.198,0,153.995-68.798,153.995-153.995S239.199,0.004,154.001,0.004z M154.001,277.606c-24.748,0-48.627-7.051-69.254-20.376c-1.898-1.209-4.21-1.579-6.374-1.04l-45.922,9.887l9.887-45.909 c0.539-2.165,0.169-4.478-1.04-6.377c-13.328-20.626-20.379-44.502-20.379-69.248c0-74.619,60.724-135.344,135.344-135.344 s135.344,60.724,135.344,135.344S228.62,277.606,154.001,277.606z"
                  />
                </g>
              </svg>
            </a>
            <a
              href="https://github.com/subhadeeproy3902/BloxAI"
              className="text-neutral-500 hover:text-gray-900 dark:hover:text-white ms-5"
            >
              <svg
                fill="currentColor"
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.998.107-.775.418-1.305.76-1.605-2.665-.305-5.466-1.335-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.125-.304-.535-1.527.115-3.176 0 0 1.005-.322 3.3 1.23.955-.266 1.98-.398 3-.403 1.02.005 2.045.137 3 .403 2.28-1.552 3.285-1.23 3.285-1.23.655 1.65.245 2.872.12 3.176.77.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.37.815 1.096.815 2.21 0 1.595-.015 2.88-.015 3.28 0 .322.215.697.825.577 4.765-1.587 8.2-6.084 8.2-11.387 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
