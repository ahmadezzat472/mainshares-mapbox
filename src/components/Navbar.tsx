import { useState } from "react";
import { Button } from "./ui/button";
import Logo from "./Logo";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className=" bg-customPrimaryDark fixed top-0 left-0 right-0 border-b border-customPrimary flex justify-between items-center h-[64px] px-[16px] md:px-[40px] text-customSecondary z-50">
      {/* Logo */}
      <div
        className="flex shrink-0 items-center cursor-pointer"
        onClick={() => window.location.reload()}
      >
        <Logo />
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex">
        <div className="flex items-center px-[12px] gap-[6px]">
          <svg
            width="16"
            height="13"
            viewBox="0 0 16 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.59375 9.97656V2.23828L1.3125 3.33203V11.0703L4.59375 9.97656ZM9.84375 11.2891V3.55078L5.90625 2.23828V9.97656L9.84375 11.2891ZM11.1562 11.2891L14.4375 10.1953V2.45703L11.1562 3.55078V11.2891ZM0 12.875V11.5078V2.375L5.25 0.625L10.5 2.375L14.4375 1.0625L15.75 0.625V2.01953V11.125L10.5 12.875L5.25 11.125L1.3125 12.4375L0 12.875Z"
              fill="#FCFBF8"
            />
          </svg>

          <p>Find local business</p>
        </div>

        <div className="ml-[24px]">
          <Button className="bg-customSecondary text-customPrimaryDark font-semibold px-4 py-2 rounded-[4px] transition-all duration-300 hover:scale-105">
            Apply here
          </Button>
        </div>
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block md:hidden">
        <img src="/src/assets/top nav item.png" />
      </div>
    </div>
  );
};

export default Navbar;
