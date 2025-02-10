import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import Dropdown from "./Dropdown";

interface FilterInputProps {
  setSelectedCategories: (arg: string) => void;
  selectedCategories: string;
  setDrobdownIsOpen: (arg: boolean) => void;
  categories: string[];
}

const FilterInput = ({
  selectedCategories,
  setSelectedCategories,
  setDrobdownIsOpen,
  categories,
}: FilterInputProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openDropDown = () => {
    setIsOpen(!isOpen);
    setDrobdownIsOpen(!isOpen);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setDrobdownIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Button
      className="shadow-none flex items-center gap-[6px] px-[16px] border border-customAccent rounded-[0_6px_6px_0] h-[44px] ml-[-1px] cursor-pointer sm:relative"
      style={{ backgroundColor: isOpen ? "#F2F1EC" : "#FCFBF8", borderColor: isOpen ? "#D0D2CD" : "#D0D3CD" }}
    >
      <div className="flex items-center gap-[6px]" onClick={openDropDown} >
        {selectedCategories.length == 0 && (
          <div className="size-[13px]">
            <svg
              className="!size-full"
              viewBox="0 0 13 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.5 0.5H12.75V1.8125H0.5V0.5ZM2.25 4.875H11V6.1875H2.25V4.875ZM8.375 9.25V10.5625H4.875V9.25H8.375Z"
                fill="#132527"
              />
            </svg>
          </div>
        )}

        <h3 className="font-semibold text-[14px]">Filter</h3>

        {selectedCategories.length > 0 && (
          <div className="rounded-[2px] bg-customPrimary text-customSecondary text-[14px] font-semibold px-[5px] py-[1px] ">
            {selectedCategories.split(",").length}
          </div>
        )}
      </div>

      <div ref={dropdownRef}>
        <Dropdown
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setSelectedCategories={setSelectedCategories}
          selectedCategories={selectedCategories}
          setDrobdownIsOpen={setDrobdownIsOpen}
          categories={categories}
        />
      </div>
    </Button>
  );
};

export default FilterInput;
