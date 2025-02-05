import { defaultLocalBusiness } from "@/data";
import Separator from "./Separator";
import { LocalBusiness } from "@/interfaces";
import LocalBussLogo from "./LocalBussLogo";

interface IProps {
  SelectedCard: LocalBusiness;
  setActiveCardId: (arg: string) => void;
  setSelectedCard: (arg: LocalBusiness) => void;
}

const BusinessCard = ({
  SelectedCard,
  setActiveCardId,
  setSelectedCard,
}: IProps) => {
  if (SelectedCard && SelectedCard.id)
    return (
      <div className="w-full bg-[#FCFBF8] relative rounded-[6px]">
        <div className="bg-[#E3E3DE] w-full h-[72px] relative">
          <div className="w-[72px] h-[72px] bg-[#FCFBF8] border border-[#E3E3DE] rounded-[4px] absolute top-[16px] left-[16px] flex items-center justify-center">
            <LocalBussLogo />
          </div>
        </div>

        <div className="flex flex-col gap-[16px] p-[40px_16px_16px]">
          <div>
            <h1 className="font-semibold text-[16px] text-[#132527] mb-2">
              {SelectedCard.name}
            </h1>
            <p className="font-medium text-[14px] text-[#727C7A]">
              {SelectedCard.industry}
            </p>
          </div>

          <p className="font-[450px] text-[14px] text-[#374140] leading-[150%]">
            {SelectedCard.description}
          </p>

          <Separator width="100%" />

          <div className="flex gap-[6px] items-center">
            <svg
              width="10"
              height="14"
              viewBox="0 0 10 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 13.625C5 13.625 0.125 8.34375 0.125 5.5C0.125 2.80859 2.30859 0.625 5 0.625C7.69141 0.625 9.875 2.80859 9.875 5.5C9.875 8.34375 5 13.625 5 13.625ZM5 3.875C4.41602 3.875 3.88281 4.20508 3.57812 4.6875C3.29883 5.19531 3.29883 5.83008 3.57812 6.3125C3.88281 6.82031 4.41602 7.125 5 7.125C5.55859 7.125 6.0918 6.82031 6.39648 6.3125C6.67578 5.83008 6.67578 5.19531 6.39648 4.6875C6.0918 4.20508 5.55859 3.875 5 3.875Z"
                fill="#374140"
              />
            </svg>
            <span className="font-medium text-[14px] text-[#374140]">
              {SelectedCard.companyAddress}
            </span>
          </div>

          <Separator width="100%" />

          <div className="flex gap-[6px] items-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.50195 11.7031C4.96875 11.043 4.43555 10.1797 4.10547 9.0625H2.30273C2.96289 10.332 4.10547 11.2969 5.50195 11.7031ZM6.33984 10.7891C6.56836 11.0938 6.79688 11.3477 7 11.5508C7.17773 11.3477 7.40625 11.0938 7.63477 10.7891C7.99023 10.332 8.3457 9.77344 8.59961 9.0625H5.375C5.6543 9.77344 5.98438 10.332 6.33984 10.7891ZM4.96875 6.625C4.96875 7.08203 4.99414 7.46289 5.07031 7.84375H8.92969C8.98047 7.46289 9.03125 7.08203 9.03125 6.625C9.03125 6.19336 8.98047 5.78711 8.92969 5.40625H5.07031C4.99414 5.78711 4.96875 6.19336 4.96875 6.625ZM3.82617 5.40625H1.8457C1.74414 5.8125 1.71875 6.21875 1.71875 6.625C1.71875 7.05664 1.76953 7.46289 1.8457 7.84375H3.82617C3.77539 7.46289 3.75 7.05664 3.75 6.625C3.75 6.21875 3.77539 5.8125 3.82617 5.40625ZM5.375 4.1875H8.59961C8.3457 3.50195 7.99023 2.91797 7.63477 2.46094C7.40625 2.18164 7.17773 1.92773 7 1.72461C6.79688 1.92773 6.56836 2.18164 6.33984 2.46094C5.98438 2.91797 5.6543 3.50195 5.375 4.1875ZM10.1484 5.40625C10.1992 5.8125 10.25 6.21875 10.25 6.625C10.25 7.05664 10.1992 7.46289 10.1484 7.84375H12.1289C12.2305 7.46289 12.2812 7.05664 12.2812 6.625C12.2812 6.21875 12.2305 5.8125 12.1289 5.40625H10.1484ZM11.6719 4.1875C11.0117 2.94336 9.86914 1.97852 8.47266 1.57227C9.00586 2.23242 9.53906 3.0957 9.86914 4.1875H11.6719ZM4.10547 4.1875C4.43555 3.0957 4.96875 2.23242 5.50195 1.57227C4.10547 1.97852 2.96289 2.94336 2.30273 4.1875H4.10547ZM8.47266 11.7031C9.86914 11.2969 11.0117 10.332 11.6719 9.0625H9.86914C9.53906 10.1797 9.00586 11.043 8.47266 11.7031ZM7 13.125C4.66406 13.125 2.53125 11.9062 1.36328 9.875C0.195312 7.86914 0.195312 5.40625 1.36328 3.375C2.53125 1.36914 4.66406 0.125 7 0.125C9.31055 0.125 11.4434 1.36914 12.6113 3.375C13.7793 5.40625 13.7793 7.86914 12.6113 9.875C11.4434 11.9062 9.31055 13.125 7 13.125Z"
                fill="#374140"
              />
            </svg>
            <a
              href={SelectedCard.website}
              className="font-medium text-[14px] text-[#374140]"
            >
              {SelectedCard.website}
            </a>
          </div>

          <div className="flex gap-[6px] items-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.5 0.9375L4.15625 0.125L6.1875 3.78125L4.05469 5.48242C4.96875 7.23438 6.39062 8.65625 8.14258 9.57031L9.84375 7.4375L13.5 9.46875L12.6875 13.125H11.875C5.57812 13.125 0.5 8.04688 0.5 1.75V0.9375Z"
                fill="#374140"
              />
            </svg>
            <span className="font-medium text-[14px] text-[#374140]">
              {SelectedCard.companyPhone}
            </span>
          </div>
        </div>
        <div
          onClick={() => {
            setActiveCardId("");
            setSelectedCard(defaultLocalBusiness);
          }}
          className="cursor-pointer absolute top-[12px] right-[12px] size-[32px] rounded-[50%] border border-[#E3E3DE] bg-[#FCFBF8] flex justify-center items-center"
        >
          <svg
            width="14"
            height="16"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.93359 1.49609L5.65234 4.75L8.90625 8.00391L9.37109 8.46875L8.46875 9.39844L8.00391 8.93359L4.75 5.67969L1.49609 8.93359L1.03125 9.39844L0.101562 8.46875L0.566406 8.00391L3.82031 4.75L0.566406 1.49609L0.101562 1.03125L1.03125 0.101562L1.49609 0.566406L4.75 3.84766L8.00391 0.59375L8.46875 0.128906L9.39844 1.03125L8.93359 1.49609Z"
              fill="#132527"
            />
          </svg>
        </div>
      </div>
    );
};

export default BusinessCard;
