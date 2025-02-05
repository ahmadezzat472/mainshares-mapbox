import { MouseEventHandler } from "react";

interface IProps {
  width: string;
  height?: string;
  bgColor: string;
  txtColor: string;
  txt: string;
  padding: string;
  margin?: string;
  onClick?: MouseEventHandler<HTMLDivElement> | undefined;
}

const BtnCustom = ({
  bgColor,
  height,
  txtColor,
  width,
  txt,
  padding,
  margin,
  onClick,
}: IProps) => {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: bgColor,
        color: txtColor,
        padding,
        textAlign: "center",
        margin,
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
      onClick={onClick}
    >
      {txt}
    </div>
  );
};

export default BtnCustom;
