import { useState } from "react";
import { IDataFilter } from "@/interfaces";
import "../App.css";

interface DropdownItemsProps {
  data: IDataFilter;
  selectedChildren: string[]; // Get selected children from the parent
  onChildSelect: (childName: string, isChecked: boolean) => void;
}

const DropdownItems = ({
  data,
  selectedChildren,
  onChildSelect,
}: DropdownItemsProps) => {
  const [isOpenChild, setIsOpenChild] = useState(true);

  // Check if all children are selected
  const allChecked = data.children?.every((child) =>
    selectedChildren.includes(child.name)
  );
  const someChecked =
    data.children?.some((child) => selectedChildren.includes(child.name)) &&
    !allChecked;

  const handleParentChange = () => {
    if (allChecked) {
      // Deselect all children
      data.children?.forEach((child) => onChildSelect(child.name, false));
    } else {
      // Select all children
      data.children?.forEach((child) => onChildSelect(child.name, true));
    }
  };

  const handleChildChange = (childName: string) => {
    const isChecked = !selectedChildren.includes(childName);
    onChildSelect(childName, isChecked);
  };

  return (
    <div>
      {/* Parent Item */}
      <div className="flex mb-4 items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <div
            className={`w-5 h-5 flex items-center justify-center border rounded border-[#D0D2CD] ${
              allChecked || someChecked ? "bg-[#132527] border-none" : ""
            }`}
            onClick={handleParentChange}
          >
            {allChecked ? (
              <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
                <path
                  d="M12.7227 1.66016L12.0938 2.26172L5.44922 8.57812L4.84766 9.15234L4.24609 8.57812L1.12891 5.625L0.5 5.02344L1.70312 3.76562L2.33203 4.36719L4.84766 6.71875L10.8906 0.976562L11.5195 0.375L12.7227 1.66016Z"
                  fill="#FCFBF8"
                />
              </svg>
            ) : someChecked ? (
              <svg width="13" height="3" viewBox="0 0 13 3" fill="none">
                <path
                  d="M12.3125 2.625H11.4375H1.8125H0.9375V0.875H1.8125H11.4375H12.3125V2.625Z"
                  fill="#FCFBF8"
                />
              </svg>
            ) : null}
          </div>
          <span className="text-sm font-medium">{data.name}</span>
        </label>

        {data.children && data.children.length > 0 && (
          <span
            className="cursor-pointer"
            onClick={() => setIsOpenChild(!isOpenChild)}
          >
            {isOpenChild ? (
              <svg width="14" height="9" viewBox="0 0 14 9" fill="none">
                <path
                  d="M7 8.50781L6.37109 7.87891L1.12109 2.62891L0.492188 2L1.75 0.769531L2.35156 1.39844L7 6.01953L11.6211 1.39844L12.25 0.769531L13.4805 2L12.8516 2.62891L7.60156 7.87891L7 8.50781Z"
                  fill="#727C7A"
                />
              </svg>
            ) : (
              <svg width="9" height="14" viewBox="0 0 9 14" fill="none">
                <path
                  d="M8.29297 6.75L7.66406 7.37891L2.41406 12.6289L1.8125 13.2578L0.554688 12L1.18359 11.3984L5.80469 6.75L1.18359 2.12891L0.554688 1.5L1.8125 0.269531L2.41406 0.898438L7.66406 6.14844L8.29297 6.75Z"
                  fill="#727C7A"
                />
              </svg>
            )}
          </span>
        )}
      </div>

      {/* Children Items */}
      {isOpenChild && (
        <ul className="ml-6 flex flex-col gap-4">
          {data.children?.map((child, index) => (
            <li key={index}>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="custom-checkbox"
                  checked={selectedChildren.includes(child.name)}
                  onChange={() => handleChildChange(child.name)}
                />
                <span className="text-sm font-medium">
                  {child.name.length > 20
                    ? `${child.name.slice(0, 25)}...`
                    : child.name}
                </span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownItems;
