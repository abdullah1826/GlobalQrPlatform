import { bodyShape, iFrameShape, iShape } from "../../assets/returnSocialIcons";

interface SetCustomProps {
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
    logo: string | Blob;
    bShape: "squares" | "dots" | undefined;
    iShape: [number, number, number, number];
    fShape: [number, number, number, number];
  };
}

const Custom: React.FC<SetCustomProps> = ({
  editQrInfo,
  qrInfo,
  handleRoute,
}) => {
  console.log(qrInfo);

  return (
    <div className="w-[100%] h-[99%] flex flex-col items-center relative">
      <h2 className="font-[600] text-[37px] text-[#FE5B24]">Customize</h2>
      <div className="w-[95%] h-[90%] overflow-y-scroll">
        <div className="w-[100%] mt-2">
          <h2 className="font-[600] text-[20px] text-[#FE5B24] ">Body Shape</h2>
          <div className=" w-[98%] flex justify-start flex-wrap gap-3 mt-2 ml-[1%]">
            {bodyShape?.map((elm) => {
              return (
                <div
                  className="w-[55px] h-[51px] rounded-[13px] shadow-md border flex justify-center items-center"
                  onClick={() => editQrInfo(elm?.bShape, "bShape")}
                >
                  <img src={elm?.img} alt="" className="h-[35px] w-[35px]" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-[100%] mt-4">
          <h2 className="font-[600] text-[20px] text-[#FE5B24] ">
            Eye Frame Shape
          </h2>
          <div className=" w-[98%] ml-[1%] flex justify-start flex-wrap gap-3 mt-2">
            {iFrameShape?.map((elm) => {
              return (
                <div
                  className="w-[55px] h-[51px] rounded-[13px] shadow-md border flex justify-center items-center"
                  onClick={() => editQrInfo(elm?.fShape, "fShape")}
                >
                  <img src={elm?.img} alt="" className="h-[35px] w-[35px]" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-[100%] mt-4">
          <h2 className="font-[600] text-[20px] text-[#FE5B24] ">Eye Shape</h2>
          <div className=" w-[98%] ml-[1%] flex justify-start flex-wrap gap-3 mt-2">
            {iShape?.map((elm) => {
              return (
                <div
                  className="w-[55px] h-[51px] rounded-[13px] shadow-md border flex justify-center items-center"
                  onClick={() => editQrInfo(elm?.iShape, "iShape")}
                >
                  <img src={elm?.img} alt="" className="h-[35px] w-[35px]" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex gap-2  justify-end absolute bottom-0 w-[90%]">
          <button
            className="h-[50px] w-[136px] outline-none rounded-[14px] bg-[#E2E2E2] text-[#8B8B8B] font-[600] text-[16px]"
            onClick={() => handleRoute("logo")}
          >
            Cancel
          </button>
          {/* <button className="h-[50px] w-[136px] outline-none rounded-[14px] bg-[#FE5B24] text-[white] font-[600] text-[16px]">
            Next
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Custom;
