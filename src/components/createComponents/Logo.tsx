import React, { ChangeEvent, useState } from "react";
import { iconsData } from "../../assets/returnSocialIcons";
import upload from "../../imgs/upload.png";
import { IoIosAddCircle } from "react-icons/io";
import { Crop } from "react-image-crop";
import Cropper from "../Cropper";

interface SetLogoProps {
  editQrInfo: (infoValue: string, key: string) => void;
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

const Logo: React.FC<SetLogoProps> = ({ editQrInfo, qrInfo, handleRoute }) => {
  console.log(qrInfo);

  let [prflimg, setprflimg] = useState<string>("");
  let [cropModal, setcropModal] = useState<boolean>(false);
  let [myprflimg, setmyprflimg] = useState<HTMLImageElement | null>(null);
  let [cropPrfl, setCropPrfl] = useState<Crop>({
    unit: "%",
    x: 50,
    y: 50,
    width: 25,
    height: 25,
  });

  let handleclosecropper = () => {
    setcropModal(false);
    // settheimg(null)
  };

  const handleLogoImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    setprflimg("");
    const { files } = event.target;

    if (files && files.length > 0) {
      const reader = new FileReader();
      const selectedFile = files[0];
      console.log(selectedFile);
      reader.onload = () => {
        const base64String = reader.result as string;
        setprflimg(base64String);
        setcropModal(true);
      };

      reader.onerror = (error) => {
        console.error("Error reading the file:", error);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  let getCropedLogo = (val: string) => {
    editQrInfo(val, "logo");
  };

  console.log(JSON.stringify({ image: prflimg }));

  return (
    <div className="w-[100%] h-[95%] flex flex-col items-center relative">
      <Cropper
        cropModal={cropModal}
        handleclosecropper={handleclosecropper}
        theimg={prflimg}
        myimg={myprflimg}
        setmyimg={setmyprflimg}
        setcrop={setCropPrfl}
        crop={cropPrfl}
        aspect={1 / 1}
        setReduxState={getCropedLogo}
        isCircle={false}
      />
      <h2 className="font-[600] text-[37px] text-[#FE5B24]">Set Logo</h2>
      <div className="w-[95%] h-[90%] ">
        <div className="w-[90%]">
          <h2 className="font-[600] text-[20px] text-[#676767]">
            Upload Logo Image
          </h2>
          <p className="font-[400] text-[14px] text-[#6D6D6D]">
            Upload your own custom logo image as .png, .jpg, .gif or .svg file
            format with a maximum size of 2 MB. You can also select a logo for
            your QR code from the gallery.
          </p>
        </div>

        <div className="w-[100%] flex justify-between items-center mt-[30px]">
          <div className="w-[35%] h-[182px] border-[1.5px] border-dashed border-[#FE5B24] rounded-[30px] flex flex-col gap-2 justify-center items-center">
            <img src={upload} alt="" className="h-[43px] w-[64px]" />
            <p className="font-[700px] text-[12px] text-[#FE5B24]">
              Drag and Drop your Image
            </p>
            <p className="font-[400px] text-[14px] text-[#FE5B24]">Or</p>

            <label htmlFor="upload">
              <div className="h-[42px] w-[130px] bg-[#FE5B24] rounded-[23px] flex justify-center items-center gap-1 text-white font-[700] text-[12px] cursor-pointer">
                <IoIosAddCircle className="text-xl" />
                Upload Photo
              </div>
              <input
                type="file"
                onChange={handleLogoImageChange}
                id="upload"
                style={{ display: "none" }}
              />
            </label>
          </div>
          <div className="h-[182px] w-[62%] grid grid-cols-7 gap-4">
            {iconsData?.map((elm) => {
              return (
                <div
                  className="w-[49px] h-[45px] rounded-[13px] shadow-lg flex justify-center items-center cursor-pointer"
                  onClick={() => editQrInfo(elm?.img, "logo")}
                >
                  <img src={elm?.img} alt="" className="h-[35px] w-[35px]" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-2  justify-end absolute bottom-0 w-[95%]">
          <button
            className="h-[50px] w-[136px] outline-none rounded-[14px] bg-[#E2E2E2] text-[#8B8B8B] font-[600] text-[16px]"
            onClick={() => handleRoute("color")}
          >
            Cancel
          </button>
          <button
            className="h-[50px] w-[136px] outline-none rounded-[14px] bg-[#FE5B24] text-[white] font-[600] text-[16px]"
            onClick={() => handleRoute("custom")}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logo;
