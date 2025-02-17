import Logo from "./Logo";

const Footer = () => {
  return (
    <div className="px-[50px] md:px-[70px] lg:px-[120px] py-[48px] bg-customSecondary">
      <div
        className="flex shrink-0 items-center cursor-pointer"
        onClick={() => window.location.reload()}
      >
        <Logo isActive={true} />
      </div>

      <div className="py-[32px]">
        <svg
          width="100%"
          height="1"
          viewBox="0 0 1200 1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="1200" height="1" className="fill-customAccent" />
        </svg>
      </div>

      <div className="flex justify-between">
        <p className="text-[14px] font-medium text-customPrimary">
          © 2024 Mainshares, LLC. All rights reserved.
        </p>
        <div className="flex gap-[6px] md:gap-[16px]">
          <a href="#">
            <img className="w-[16px] hover:scale-110 transition-all duration-300 " src="/src/assets/socialLogo.svg" />
          </a>
          <a href="#">
            <img className="w-[16px] hover:scale-110 transition-all duration-300 " src="/src/assets/socialLogoLinked.svg" />
          </a>
          <a href="#">
            <img className="w-[16px] hover:scale-110 transition-all duration-300 " src="/src/assets/socialLogoX.svg" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
