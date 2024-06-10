import React from "react";
import { Box, Modal } from "@mui/material";
import { ReactCrop, Crop } from "react-image-crop";

import "react-image-crop/dist/ReactCrop.css";

interface CropperProps {
  cropModal: boolean;
  handleclosecropper: () => void;
  theimg: string | undefined;
  myimg: HTMLImageElement | null;
  setmyimg: (img: HTMLImageElement) => void;
  setcrop: React.Dispatch<React.SetStateAction<Crop>>;
  crop: Crop;
  aspect?: number;
  setReduxState: (state: string) => void;
  isCircle: boolean;
}

const Cropper: React.FC<CropperProps> = ({
  cropModal,
  handleclosecropper,
  theimg,
  myimg,
  setmyimg,
  setcrop,
  crop,
  aspect,
  setReduxState,
  isCircle,
}) => {
  const getProfileCropImage = async () => {
    if (!myimg) return;

    const canvas = document.createElement("canvas");
    const scaleX = myimg.naturalWidth / myimg.width;
    const scaleY = myimg.naturalHeight / myimg.height;
    canvas.width = crop.width || 0;
    canvas.height = crop.height || 0;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const pixelRatio = window.devicePixelRatio;
    canvas.width = (crop.width || 0) * pixelRatio;
    canvas.height = (crop.height || 0) * pixelRatio;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = "high";

    ctx.drawImage(
      myimg,
      (crop.x || 0) * scaleX,
      (crop.y || 0) * scaleY,
      (crop.width || 0) * scaleX,
      (crop.height || 0) * scaleY,
      0,
      0,
      crop.width || 0,
      crop.height || 0
    );

    const base64Image = canvas.toDataURL("image/jpeg");
    // const blob = await fetch(base64Image).then((res) => res.blob());
    setReduxState(base64Image);
    // dataUrlToFile(base64Image, "global-qr-img");
    handleclosecropper();
  };

  const style2: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "95%",
    width: "80%",
    outline: "none",
  };

  return (
    <Modal
      open={cropModal}
      onClose={handleclosecropper}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style2}>
        <ReactCrop
          crop={crop}
          onChange={(c) => {
            if (c.width && c.height) {
              setcrop(c);
            }
          }}
          circularCrop={isCircle}
          aspect={aspect}
        >
          <img
            src={theimg}
            alt="img"
            onLoad={(e) => setmyimg(e.target as HTMLImageElement)}
            style={{
              maxWidth: "995px",
              maxHeight: "calc(100vh - 150px)",
            }}
          />
        </ReactCrop>
        <div
          style={{
            width: "50%",
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            onClick={handleclosecropper}
            style={{
              backgroundColor: "white",
              outline: "none",
              marginRight: "10px",
              border: "none",
              color: "black",
              height: "40px",
              width: "105px",
              borderRadius: "20px",
              cursor: "pointer",
            }}
            className="hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={getProfileCropImage}
            style={{
              backgroundColor: "black",
              outline: "none",
              marginLeft: "10px",
              border: "none",
              color: "white",
              height: "40px",
              width: "105px",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            Crop
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default Cropper;
