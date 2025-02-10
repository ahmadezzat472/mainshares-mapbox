interface DropdownItemsProps {
  category: string;
  selectedChildren: string[];
  onChildSelect: (childName: string, isChecked: boolean) => void;
}

const DropdownItems = ({
  category,
  selectedChildren,
  onChildSelect,
}: DropdownItemsProps) => {
  const isChecked = selectedChildren.includes(category);

  const handleCategoryChange = () => {
    onChildSelect(category, !isChecked);
  };

  return (
    <div
      className="flex items-center gap-2 cursor-pointer overflow-x-hidden"
      onClick={handleCategoryChange}
    >
      <input
        type="checkbox"
        className="custom-checkbox flex-shrink-0"
        checked={isChecked}
        readOnly
      />
      <span className="text-[14px] font-medium truncate min-w-0 text-customPrimaryDark">
        {category}
      </span>
    </div>
  );
};

export default DropdownItems;
