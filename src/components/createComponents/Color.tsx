interface SetColorProps {
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

const Color: React.FC<SetColorProps> = ({
  editQrInfo,
  qrInfo,
  handleRoute,
}) => {
  return (
    <div className="w-[100%] h-[95%] flex flex-col items-center relative">
      <h2 className="font-[600] text-[40px] text-[#FE5B24]">Set Colors</h2>
      <div className="w-[100%] flex justify-start  mt-[60px]">
        <div className="w-[45%] ml-5">
          <h2 className="font-[600] text-[20px] text-[#767676]">
            Foreground Color
          </h2>
          <div className="w-[220px] h-[55px] border mt-3 rounded-[12px]">
            <div className="single-color flex items-center justify-between bg-gray-200 border border-gray-300 rounded-lg h-[100%] w-[100%] px-2">
              <div className="flex items-center justify-start w-1/3 ">
                <div
                  className="w-12 h-11 rounded-[12px] flex justify-center items-center  overflow-hidden"
                  style={{ backgroundColor: qrInfo?.forColor }}
                >
                  <input
                    type="color"
                    onChange={(e) => editQrInfo(e.target.value, "forColor")}
                    value={qrInfo?.forColor}
                    className="w-[105%] h-[130%] appearance-none bg-transparent border-none cursor-pointer "
                  />
                </div>
              </div>

              <div className="color-value flex items-center justify-center w-2/3 text-base font-medium text-gray-700">
                {qrInfo?.forColor}
              </div>
            </div>
          </div>
        </div>

        <div className="w-[45%]">
          <h2 className="font-[600] text-[20px] text-[#767676]">
            Background Color
          </h2>
          <div className="w-[220px] h-[55px] border mt-3 rounded-[12px]">
            <div className="single-color flex items-center justify-between bg-gray-200 border border-gray-300 rounded-lg h-[100%] w-[100%] px-2">
              <div className="flex items-center justify-start w-1/3 ">
                <div
                  className="w-12 h-11 rounded-[12px] flex justify-center items-center  overflow-hidden"
                  style={{ backgroundColor: qrInfo?.bgColor }}
                >
                  <input
                    type="color"
                    onChange={(e) => editQrInfo(e.target.value, "bgColor")}
                    value={qrInfo?.bgColor}
                    className="w-[105%] h-[130%] appearance-none bg-transparent border-none cursor-pointer "
                  />
                </div>
              </div>

              <div className="color-value flex items-center justify-center w-2/3 text-base font-medium text-gray-700">
                {qrInfo?.bgColor}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[100%] flex justify-start  mt-[40px]">
        <div className="w-[45%] ml-5">
          <h2 className="font-[600] text-[20px] text-[#767676]">Eye Color</h2>
          <div className="w-[220px] h-[55px] border mt-3 rounded-[12px]">
            <div className="single-color flex items-center justify-between bg-gray-200 border border-gray-300 rounded-lg h-[100%] w-[100%] px-2">
              <div className="flex items-center justify-start w-1/3 ">
                <div
                  className="w-12 h-11 rounded-[12px] flex justify-center items-center  overflow-hidden"
                  style={{ backgroundColor: qrInfo?.iColor }}
                >
                  <input
                    type="color"
                    onChange={(e) => editQrInfo(e.target.value, "iColor")}
                    value={qrInfo?.iColor}
                    className="w-[105%] h-[130%] appearance-none bg-transparent border-none cursor-pointer "
                  />
                </div>
              </div>

              <div className="color-value flex items-center justify-center w-2/3 text-base font-medium text-gray-700">
                {qrInfo?.iColor}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2  justify-end absolute bottom-0 w-[90%]">
        <button
          className="h-[50px] w-[136px] outline-none rounded-[14px] bg-[#E2E2E2] text-[#8B8B8B] font-[600] text-[16px]"
          onClick={() => handleRoute("content")}
        >
          Cancel
        </button>
        <button
          className="h-[50px] w-[136px] outline-none rounded-[14px] bg-[#FE5B24] text-[white] font-[600] text-[16px]"
          onClick={() => handleRoute("logo")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Color;
