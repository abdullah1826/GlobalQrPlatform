interface SetContentProps {
  editQrInfo: (
    infoValue: string | number[] | File | "squares" | "dots" | undefined,
    key: string
  ) => void;
  // swapForColors: () => void;
  // swapIColors: () => void;
  handleRoute: (route: string) => void;
  qrInfo: {
    name: string;
    value: string;
    forColor: string;
    iColor: string;
    forColor2: string;
    iColor2: string;
    bgColor: string;
    logo: string | undefined;
    bShape: "squares" | "dots" | undefined;
    iShape: [number, number, number, number];
    fShape: [number, number, number, number];
  };
}

const Content: React.FC<SetContentProps> = ({
  editQrInfo,
  qrInfo,
  handleRoute,
}) => {
  return (
    <div className="w-[100%] h-[95%] flex flex-col justify-between items-center">
      <h2 className="font-[600] text-[40px] text-[#FE5B24]">Content</h2>
      <div className="w-[70%] flex flex-col items-center">
        <h2 className="text-[#838383] font-[600] text-[20px]">Qr Name</h2>
        <input
          type="text"
          className="w-[97%] h-[58px] rounded-[32px] bg-[#F1F1F1] outline-none border-[#CACACA] border mt-1 pl-[3%]"
          onChange={(e) => editQrInfo(e.target.value, "name")}
          value={qrInfo.name}
        />
      </div>
      <div className="w-[70%] flex flex-col items-center">
        <h2 className="text-[#838383] font-[600] text-[20px]">Your URL</h2>
        <input
          type="text"
          className="w-[97%] h-[58px] rounded-[32px] bg-[#F1F1F1] outline-none border-[#CACACA] border mt-1 pl-[3%]"
          onChange={(e) => editQrInfo(e.target.value, "value")}
          value={qrInfo.value}
        />
      </div>
      <div className="flex gap-2 items-center">
        {/* <button className="h-[50px] w-[136px] outline-none rounded-[14px] bg-[#FE5B24] text-[white] font-[600] text-[16px]">
          Next
        </button> */}
        <button
          className="h-[50px] w-[136px] outline-none rounded-[14px] bg-[#FE5B24] text-[white] font-[600] text-[16px]"
          onClick={() => handleRoute("color")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Content;
