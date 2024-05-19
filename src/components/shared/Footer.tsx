import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
const Footer = () => {
  const iconsfooter=[{
    name:"whatsapp",
    Logo:<FaWhatsapp/>,
    links:"https://chat.whatsapp.com/E5oRd1VG1Ov4HoNPq4QcRU"
  },
  {
    name:"github",
    Logo:<FaGithub/>,
    links:"https://github.com/subhadeeproy3902/BloxAI"
  },
]
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
          <div className="flex mt-4 sm:justify-center items-center sm:mt-0">

            {
              iconsfooter.map((data,index)=>(
                <a
                key={index}
                href={data.links}
                className="text-neutral-500 hover:text-gray-900 transition dark:hover:text-white ms-5"
                target="_blank"
              >
              {data.Logo}
              </a>
              ))
            }
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
