import { LocalBusiness } from "@/interfaces";

interface IProps {
  localBusinesseData: LocalBusiness;
  onClick: () => void;
}

const ResultCard = ({ localBusinesseData, onClick }: IProps) => {
  return (
    <div
      className="cursor-pointer flex justify-between !gap-[16px] p-[12px] hover:bg-customSecondaryDark transition duration-200"
      onClick={onClick}
    >
      <div className="flex flex-col gap-[8px] w-[calc(100%-96px)]">
        <div>
          <h1 className="font-semibold text-[16px] text-customPrimaryDark mb-2">
            {localBusinesseData.name}
          </h1>

          <p className="font-medium text-[14px] text-customPrimaryLight">
            {localBusinesseData.industry}
          </p>
        </div>

        <p className="font-[450px] text-[14px] text-customPrimary leading-[150%]">
          {localBusinesseData.description}
        </p>

        <div className="flex items-center">
          <svg
            width="23"
            height="22"
            viewBox="0 0 23 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              filter="url(#filter0_d_4718_191)"
              className="translate-y-[4px] translate-x-[-5px]"
            >
              <path
                d="M10.002 11.7031C9.46875 11.043 8.93555 10.1797 8.60547 9.0625H6.80273C7.46289 10.332 8.60547 11.2969 10.002 11.7031ZM10.8398 10.7891C11.0684 11.0938 11.2969 11.3477 11.5 11.5508C11.6777 11.3477 11.9062 11.0938 12.1348 10.7891C12.4902 10.332 12.8457 9.77344 13.0996 9.0625H9.875C10.1543 9.77344 10.4844 10.332 10.8398 10.7891ZM9.46875 6.625C9.46875 7.08203 9.49414 7.46289 9.57031 7.84375H13.4297C13.4805 7.46289 13.5312 7.08203 13.5312 6.625C13.5312 6.19336 13.4805 5.78711 13.4297 5.40625H9.57031C9.49414 5.78711 9.46875 6.19336 9.46875 6.625ZM8.32617 5.40625H6.3457C6.24414 5.8125 6.21875 6.21875 6.21875 6.625C6.21875 7.05664 6.26953 7.46289 6.3457 7.84375H8.32617C8.27539 7.46289 8.25 7.05664 8.25 6.625C8.25 6.21875 8.27539 5.8125 8.32617 5.40625ZM9.875 4.1875H13.0996C12.8457 3.50195 12.4902 2.91797 12.1348 2.46094C11.9062 2.18164 11.6777 1.92773 11.5 1.72461C11.2969 1.92773 11.0684 2.18164 10.8398 2.46094C10.4844 2.91797 10.1543 3.50195 9.875 4.1875ZM14.6484 5.40625C14.6992 5.8125 14.75 6.21875 14.75 6.625C14.75 7.05664 14.6992 7.46289 14.6484 7.84375H16.6289C16.7305 7.46289 16.7812 7.05664 16.7812 6.625C16.7812 6.21875 16.7305 5.8125 16.6289 5.40625H14.6484ZM16.1719 4.1875C15.5117 2.94336 14.3691 1.97852 12.9727 1.57227C13.5059 2.23242 14.0391 3.0957 14.3691 4.1875H16.1719ZM8.60547 4.1875C8.93555 3.0957 9.46875 2.23242 10.002 1.57227C8.60547 1.97852 7.46289 2.94336 6.80273 4.1875H8.60547ZM12.9727 11.7031C14.3691 11.2969 15.5117 10.332 16.1719 9.0625H14.3691C14.0391 10.1797 13.5059 11.043 12.9727 11.7031ZM11.5 13.125C9.16406 13.125 7.03125 11.9062 5.86328 9.875C4.69531 7.86914 4.69531 5.40625 5.86328 3.375C7.03125 1.36914 9.16406 0.125 11.5 0.125C13.8105 0.125 15.9434 1.36914 17.1113 3.375C18.2793 5.40625 18.2793 7.86914 17.1113 9.875C15.9434 11.9062 13.8105 13.125 11.5 13.125Z"
                className="fill-customPrimary"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_4718_191"
                x="0.695312"
                y="0.125"
                width="21.584"
                height="21"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset dy="4" />
                <feGaussianBlur stdDeviation="2" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_4718_191"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_4718_191"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
          <a
            href={localBusinesseData.website}
            className="font-medium text-[14px] text-customPrimary break-words whitespace-normal overflow-wrap break-word max-w-full"
          >
            {localBusinesseData.website}
          </a>
        </div>
      </div>

      <div className="size-[80px] min-w-[80px] bg-customPrimaryLight rounded-[2px] flex items-center justify-center">
        <img src={localBusinesseData.IconsSVG[0]} />
      </div>
    </div>
  );
};

export default ResultCard;
