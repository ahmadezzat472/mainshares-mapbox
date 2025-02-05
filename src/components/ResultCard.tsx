// import { industryIcons } from "@/data";
import { industryIcons } from "@/data/MapIndustryIcons";
import { LocalBusiness } from "@/interfaces";
import { getIndustryCategory } from "@/utils/getIndustryCategory";

interface IProps {
  localBusinesseData: LocalBusiness;
  onClick: () => void;
}

const ResultCard = ({ localBusinesseData, onClick }: IProps) => {
  const industryCategory = getIndustryCategory(localBusinesseData.industry);
  const IconComponent =
    industryIcons[industryCategory] || industryIcons["All Types"];

  return (
    <div
      className="cursor-pointer flex justify-between gap-[16px] p-[12px] hover:bg-[#F2F1EC] transition duration-200"
      onClick={onClick}
    >
      <div className="flex flex-col gap-[8px] w-full md:w-[60%] ">
        <div>
          <h1 className="font-semibold text-[16px] text-[#132527] mb-2">
            {localBusinesseData.name}
          </h1>
          <p className="font-medium text-[14px] text-[#727C7A]">
            {localBusinesseData.industry}
          </p>
        </div>

        <p className="font-[450px] text-[14px] text-[#374140] leading-[150%]">
          {localBusinesseData.description}
        </p>

        <div className="flex gap-[6px] items-center">
          <span className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#374140"
              className="size-[14px] shadow-lg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
          </span>
          <a
            href={localBusinesseData.website}
            className="font-medium text-[14px] text-[#374140]"
          >
            {localBusinesseData.website}
          </a>
        </div>
      </div>

      <div className="size-[80px] min-w-[80px] md:size-[50px] md:min-w-[50px] lg:size-[80px] lg:min-w-[80px] bg-[#727C7A] rounded-[2px] flex items-center justify-center ">
        <div className="size-[35px]">{IconComponent}</div>
      </div>
    </div>
  );
};

export default ResultCard;
