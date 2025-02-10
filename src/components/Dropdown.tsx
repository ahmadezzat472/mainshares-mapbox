import { useEffect, useState } from "react";
import "../App.css";
import DropdownItems from "./DropdownItems";
import Separator from "./Separator";

interface IProps {
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
  setSelectedCategories: (categories: string) => void;
  selectedCategories: string;
  setDrobdownIsOpen: (arg: boolean) => void;
  categories: string[];
}

const Dropdown = ({
  isOpen,
  setIsOpen,
  setSelectedCategories,
  selectedCategories,
  setDrobdownIsOpen,
  categories,
}: IProps) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedChildren, setSelectedChildren] = useState<string[]>([]);

  useEffect(() => {
    if (!selectedCategories.length) setSelectedChildren([]);
  }, [selectedCategories]);

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
    const sel = selectedChildren.join(",");
    setSelectedCategories(sel);
    setIsOpen(false);
    setDrobdownIsOpen(false);
  };

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isOpen)
    return (
      <div className="fixed bottom-0 left-0 right-0 z-50 md:z-30 md:absolute md:bottom-auto md:left-auto md:top-[115%] md:right-0 w-full md:w-[280px] border rounded-[12px_12px_0_0] md:rounded-[6px] bg-customSecondary shadow-lg ">
        <div className="p-[16px] md:p-0">
          <div className="md:hidden flex items-center gap-[8px] mb-[16px]">
            <span
              className="cursor-pointer"
              onClick={() => {
                setIsOpen(false);
                setDrobdownIsOpen(false);
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.9336 3.49609L7.65234 6.75L10.9062 10.0039L11.3711 10.4688L10.4688 11.3984L10.0039 10.9336L6.75 7.67969L3.49609 10.9336L3.03125 11.3984L2.10156 10.4688L2.56641 10.0039L5.82031 6.75L2.56641 3.49609L2.10156 3.03125L3.03125 2.10156L3.49609 2.56641L6.75 5.84766L10.0039 2.59375L10.4688 2.12891L11.3984 3.03125L10.9336 3.49609Z"
                  className="fill-customPrimaryDark"
                />
              </svg>
            </span>
            <p>Filter by business category</p>
          </div>

          <div className="flex items-center gap-[10px] border border-customAccent md:border-t-transparent md:border-r-transparent md:border-l-transparent md:border-b rounded-[4px] md:rounded-none  px-[12px] py-[8px]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.0625 6.4375C10.0625 4.87891 9.21484 3.45703 7.875 2.66406C6.50781 1.87109 4.83984 1.87109 3.5 2.66406C2.13281 3.45703 1.3125 4.87891 1.3125 6.4375C1.3125 8.02344 2.13281 9.44531 3.5 10.2383C4.83984 11.0312 6.50781 11.0312 7.875 10.2383C9.21484 9.44531 10.0625 8.02344 10.0625 6.4375ZM9.21484 10.9219C8.23047 11.6875 7 12.125 5.6875 12.125C2.54297 12.125 0 9.58203 0 6.4375C0 3.32031 2.54297 0.75 5.6875 0.75C8.80469 0.75 11.375 3.32031 11.375 6.4375C11.375 7.77734 10.9102 9.00781 10.1445 9.99219L13.5352 13.3828L14 13.8477L13.0703 14.75L12.6055 14.2852L9.21484 10.8945V10.9219Z"
                className="fill-customPrimaryDark"
              />
            </svg>

            <input
              type="text"
              placeholder="Search for category..."
              className="flex-grow font-medium placeholder:text-customPrimaryLight placeholder:font-medium text-customPrimaryDark bg-transparent outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {searchQuery && (
              <button onClick={() => setSearchQuery("")}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 13 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.79688 1.14453L6.5 5.84766L11.1758 1.14453L11.6406 0.679688L12.5703 1.60938L12.1055 2.07422L7.40234 6.75L12.1055 11.4531L12.5703 11.918L11.6406 12.8477L11.1758 12.3828L6.5 7.67969L1.79688 12.3828L1.33203 12.8477L0.402344 11.918L0.867188 11.4531L5.57031 6.75L0.867188 2.07422L0.402344 1.60938L1.33203 0.679688L1.79688 1.14453Z"
                    className="fill-customPrimaryLight"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        <Separator width="100%" />

        <ul className="p-[16px] flex flex-col gap-[16px] h-[67vh] md:max-h-[375px] custom-scrollbar overflow-y-auto ">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <li key={index}>
                <DropdownItems
                  category={category}
                  onChildSelect={handleChildSelect}
                  selectedChildren={selectedChildren}
                />
              </li>
            ))
          ) : (
            <li>No categories found</li>
          )}
        </ul>

        <div className="p-[16px] border-t border-customAccent">
          <div
            className="w-full py-[6px] px-[16px] font-semibold bg-customPrimaryDark text-customSecondary rounded-[4px]"
            onClick={handleApply}
          >
            Apply
          </div>
        </div>
      </div>
    );
};

export default Dropdown;
