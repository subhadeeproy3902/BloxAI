const Footer = () => {
  return (
    <footer className="dark:bg-background border-t p-2">
      <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-x-4 p-2">
        {/* Space for providing important links to the website such as:-
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
        <p>Code of Conduct</p> */}
      </div>
      <p className="dark:text-neutral-500 text-center">Copyright © 2024 BloxAI | All rights reserved</p>
    </footer>
  );
};

export default Footer;
