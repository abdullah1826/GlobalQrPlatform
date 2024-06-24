// import React from "react";
import upload from "../../imgs/upload.png";
import { IoAddCircle } from "react-icons/io5";
import { iconsData } from "../../assets/returnSocialIcons";
// import { FileUploader } from "react-drag-drop-files";
import { ChangeEvent, DragEvent, useState } from "react";
import { Crop } from "react-image-crop";
import Cropper from "../Cropper";
interface SetColorProps {
  editQrInfo: (infoValue: string, key: string) => void;
  handleRoute: (route: string) => void;
  qrInfo: {
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
const SetLogo: React.FC<SetColorProps> = ({
  editQrInfo,
  handleRoute,
  // qrInfo,
}) => {
  // const fileTypes = ["JPG", "PNG", "GIF"];
  // let handleChange = (file: string) => {
  //   editQrInfo(file, "logo");
  // };

  // const [prflimg, setprflimg] = useState<string | undefined>(undefined)

  let [prflimg, setprflimg] = useState<string | undefined>("");
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

      reader.onload = () => {
        const base64String = reader.result as string;
        getCropedLogo(base64String);
        // setprflimg(base64String);
        // setcropModal(true);
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

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setprflimg("");
    const { files } = event.dataTransfer;

    if (files && files.length > 0) {
      const reader = new FileReader();
      const selectedFile = files[0];

      reader.onload = () => {
        const base64String = reader.result as string;
        getCropedLogo(base64String);
      };

      reader.onerror = (error) => {
        console.error("Error reading the file:", error);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="logo-main">
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
      <div className="logo-inner">
        <div className="text-section">
          <h2>Upload Logo Image</h2>
          <p>
            Upload your own custom logo image as.png, .jpg,.gif or .svg file
            format with a maximum size of 2 MB. You can also select a logo for
            your QR code from the gallery.
          </p>
        </div>
        <div className="logo-section">
          {/* <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            disabled
          > */}
          <div
            className="upload-section"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <img src={upload} alt="" />
            <h2>Drag and Drop your Image</h2>
            <p>or</p>

            <label htmlFor="upload">
              <div className="upload-btn">
                <IoAddCircle style={{ color: "white", fontSize: "24px" }} />
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
          {/* </FileUploader> */}
          <div className="chose-logo-section">
            {iconsData?.map((elm) => {
              return (
                <div
                  className="single-logo"
                  onClick={() => editQrInfo(elm?.img, "logo")}
                >
                  <img src={elm?.img} alt="" />
                </div>
              );
            })}
          </div>
        </div>
        <div className="logo-btn-container">
          <button className="button1" onClick={() => handleRoute("color")}>
            Back
          </button>
          <button className="button2" onClick={() => handleRoute("custom")}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetLogo;
