import { useState } from "react";

interface IProps {
  searchValue: string;
  setSearchValue: (arg: string) => void;
}

const SearchInput = ({ searchValue, setSearchValue }: IProps) => {
  const [isActive, setIsActive] = useState(false); // Track input focus or value

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedValue = e.target.value
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());

    setSearchValue(cleanedValue);
    setIsActive(e.target.value.length > 0); // Activate border if input has text
  };

  return (
    <div
      className={`flex items-center mr-[1px] gap-[10px] border ${
        isActive ? "border-[#132527]" : "border-[#D0D2CD]"
      } rounded-[6px_0_0_6px] px-[12px] py-[8px] w-full`}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.0625 6.4375C10.0625 4.87891 9.21484 3.45703 7.875 2.66406C6.50781 1.87109 4.83984 1.87109 3.5 2.66406C2.13281 3.45703 1.3125 4.87891 1.3125 6.4375C1.3125 8.02344 2.13281 9.44531 3.5 10.2383C4.83984 11.0312 6.50781 11.0312 7.875 10.2383C9.21484 9.44531 10.0625 8.02344 10.0625 6.4375ZM9.21484 10.9219C8.23047 11.6875 7 12.125 5.6875 12.125C2.54297 12.125 0 9.58203 0 6.4375C0 3.32031 2.54297 0.75 5.6875 0.75C8.80469 0.75 11.375 3.32031 11.375 6.4375C11.375 7.77734 10.9102 9.00781 10.1445 9.99219L13.5352 13.3828L14 13.8477L13.0703 14.75L12.6055 14.2852L9.21484 10.8945V10.9219Z"
          fill="#132527"
        />
      </svg>

      <input
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={handleInputChange}
        className="w-full md:m-auto flex-grow text-black bg-transparent outline-none"
      />

      {searchValue && (
        <button onClick={() => setSearchValue("")}>
          <svg
            width="13"
            height="14"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.79688 1.14453L6.5 5.84766L11.1758 1.14453L11.6406 0.679688L12.5703 1.60938L12.1055 2.07422L7.40234 6.75L12.1055 11.4531L12.5703 11.918L11.6406 12.8477L11.1758 12.3828L6.5 7.67969L1.79688 12.3828L1.33203 12.8477L0.402344 11.918L0.867188 11.4531L5.57031 6.75L0.867188 2.07422L0.402344 1.60938L1.33203 0.679688L1.79688 1.14453Z"
              fill="#727C7A"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchInput;
