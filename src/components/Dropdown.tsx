import { Search, X } from "lucide-react";
import DropdownItems from "./DropdownItems";
import "../App.css";
import { useEffect, useState } from "react";
import { IDataFilter } from "@/interfaces";

interface IProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  industries: IDataFilter[];
  setSelectedIndustries: (industries: string) => void;
  selectedIndustries: string;
  setDrobdownIsOpen: (arg: boolean) => void;
}

const Dropdown = ({
  isOpen,
  setIsOpen,
  industries,
  setSelectedIndustries,
  selectedIndustries,
  setDrobdownIsOpen,
}: IProps) => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // Add searchQuery state
  const [selectedChildren, setSelectedChildren] = useState<string[]>([]);

  useEffect(() => {
    if (!selectedIndustries.length) setSelectedChildren([]);
  }, [selectedIndustries]);

  const handleChildSelect = (childName: string, isChecked: boolean) => {
    setSelectedChildren((prev) =>
      isChecked
        ? prev.includes(childName)
          ? prev
          : [...prev, childName]
        : prev.filter((name) => name !== childName)
    );
  };

  const handleApply = () => {
    const sel = selectedChildren.join(", ");
    setSelectedIndustries(sel);
    setIsOpen(false); // Close dropdown after applying
    setDrobdownIsOpen(false);
  };

  if (isOpen)
    return (
      <div className="fixed bottom-0 left-0 right-0 top-[100px] z-30 md:absolute md:bottom-auto md:left-auto md:top-[115%] md:right-0 w-full md:w-[280px] border rounded-[12px_12px_0_0] md:rounded-[6px] bg-white shadow-lg overflow-y-auto">
        <div className="p-[16px] md:p-0">
          <div className="md:hidden flex items-center gap-[8px] mb-[16px]">
            <span
              className="cursor-pointer"
              onClick={() => {
                setIsOpen(false);
                setDrobdownIsOpen(false);
              }}
            >
              <X className="size-[24px] text-black" />
            </span>
            <p>Filter by business category</p>
          </div>

          <div className="flex items-center gap-[10px] border border-[#D0D2CD] md:border-t-transparent md:border-r-transparent md:border-l-transparent md:border-b rounded-[4px] md:rounded-none  px-[12px] py-[8px]">
            <Search className="w-5 h-5 text-black" />

            <input
              type="text"
              placeholder="Search for category..."
              className="flex-grow text-black bg-transparent outline-none"
              value={searchQuery} // Bind input value to searchQuery
              onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
            />
          </div>
        </div>

        <ul className="p-[16px] flex flex-col gap-[16px] h- md:max-h-[375px] custom-scrollbar overflow-y-auto ">
          {industries.length > 0 ? (
            industries.map((industry, index) => (
              <li key={index}>
                <DropdownItems
                  data={industry}
                  onChildSelect={handleChildSelect}
                  selectedChildren={selectedChildren}
                />
              </li>
            ))
          ) : (
            <li>No industries found</li>
          )}
        </ul>

        <div className="p-[16px] border-t border-[#D0D2CD]">
          <div
            className="w-full py-[6px] px-[16px] bg-[#132527] text-[#FCFBF8] rounded-[4px]"
            onClick={handleApply}
          >
            Apply
          </div>
        </div>
      </div>
    );
};

export default Dropdown;
