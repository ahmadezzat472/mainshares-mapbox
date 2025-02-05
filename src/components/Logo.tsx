const Logo = ({ isActive = false }) => {
  return (
    <>
      <img
        alt="Your Company"
        src="/src/assets/logo.svg"
        className="w-[66px] h-[24px] md:w-[88px] md:h-[32px]"
        style={{ filter: `invert(${isActive ? 1 : 0})` }}
      />

      <div className="mx-[8px] md:mx-[16px]">
        <svg
          width="1"
          height="24"
          viewBox="0 0 1 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="-0.0014801" width="1" height="24" fill="#374140" />
        </svg>
      </div>

      <img
        src="/src/assets/test.svg"
        className="w-[175px] h-[12px] md:w-[233px] md:h-[16px]"
        alt=""
        style={{ filter: `invert(${isActive ? 1 : 0})` }}
      />
    </>
  );
};

export default Logo;
