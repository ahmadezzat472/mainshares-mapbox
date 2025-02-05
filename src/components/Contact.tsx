import { Button } from "@headlessui/react";

interface IProps {
  src: string;
  backgroundColor?: string;
  title: string;
  description: string;
  btnBackgroundColor?: string;
  btnTxtColor?: string;
  txtColor?: string;
  isPadding?: boolean;
}

const Contact = ({
  isPadding,
  src,
  backgroundColor,
  title,
  description,
  btnBackgroundColor = "#132527",
  btnTxtColor = "#FCFBF8",
  txtColor = "#132527",
}: IProps) => {
  return (
    <div
      className="flex flex-col items-center gap-[48px] min-h-[356px] rounded-[5px] mx-[20px] lg:mx-[48px]"
      style={{
        backgroundColor,
        color: txtColor,
        padding: isPadding ? "96px 8px" : undefined,
      }}
    >
      <div>
        <img src={src} alt="Feature" />
      </div>
      <div className="text-center">
        <h1 className="text-[22px] md:text-[32px] lg:text-[48px] mb-[16px]">
          {title}
        </h1>
        <p className="w-auto lg:w-[800px]  m-auto">{description}</p>
      </div>
      <div>
        <Button
          style={{ backgroundColor: btnBackgroundColor, color: btnTxtColor }}
          className="w-[200px] transition-all py-2 border shadow-sm rounded-[4px]"
        >
          Apply here
        </Button>
      </div>
    </div>
  );
};

export default Contact;
