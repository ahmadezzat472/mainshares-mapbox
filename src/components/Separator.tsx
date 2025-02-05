interface IProps {
  width: string;
  height?: string;
  rounded?: string;
}

const Separator = ({ width, height = "1px", rounded }: IProps) => {
  return (
    <div
      className="bg-[#E3E3DE]"
      style={{ width, height, borderRadius: rounded }}
    ></div>
  );
};

export default Separator;
