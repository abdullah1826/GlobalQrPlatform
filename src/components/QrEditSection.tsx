import React, { useState } from "react";
import "../Styles/QrEditSection.scss";
import { GiWorld } from "react-icons/gi";
import { IoIosColorPalette } from "react-icons/io";
import { FaImages } from "react-icons/fa";
import { IoQrCodeOutline } from "react-icons/io5";
import Content from "./EditContainerComponents/Content";
import SetColor from "./EditContainerComponents/SetColor";
import SetLogo from "./EditContainerComponents/setLogo";
import QrCustomize from "./EditContainerComponents/QrCustomize";

interface SetProps {
  editQrInfo: (infoValue: string | number[], key: string) => void;
  swapForColors: () => void;
  swapIColors: () => void;
  qrInfo: {
    value: string;
    forColor: string;
    forColor2: string;
    iColor: string;
    iColor2: string;
    bgColor: string;
    logo: string | undefined;
    bShape: "squares" | "dots" | undefined;
    iShape: [number, number, number, number];
    fShape: [number, number, number, number];
  };
}

const QrEditSection: React.FC<SetProps> = ({
  editQrInfo,
  qrInfo,
  swapForColors,
  swapIColors,
}) => {
  let [navigate, setNavigate] = useState<{
    isContent: boolean;
    isColor: boolean;
    isLogo: boolean;
    isCustom: boolean;
  }>({ isContent: true, isColor: false, isLogo: false, isCustom: false });

  const handleRoute = (route: string) => {
    if (route === "content") {
      setNavigate({
        isContent: true,
        isColor: false,
        isLogo: false,
        isCustom: false,
      });
    } else if (route === "color") {
      setNavigate({
        isContent: false,
        isColor: true,
        isLogo: false,
        isCustom: false,
      });
    } else if (route === "logo") {
      setNavigate({
        isContent: false,
        isColor: false,
        isLogo: true,
        isCustom: false,
      });
    } else if (route === "custom") {
      setNavigate({
        isContent: false,
        isColor: false,
        isLogo: false,
        isCustom: true,
      });
    }
  };

  return (
    <div className="edit-main">
      <div className="edit-inner">
        <div className="tabs">
          <div
            className="single-tab"
            onClick={() => handleRoute("content")}
            style={{
              backgroundColor: navigate?.isContent ? "#fe5b24" : "#EFEFEF",
              color: navigate?.isContent ? "white" : "#838383",
            }}
          >
            <GiWorld style={{ fontSize: "22px" }} />
            <p>Content</p>
          </div>
          <div
            className="single-tab"
            onClick={() => handleRoute("color")}
            style={{
              backgroundColor: navigate?.isColor ? "#fe5b24" : "#EFEFEF",
              color: navigate?.isColor ? "white" : "#838383",
            }}
          >
            <IoIosColorPalette style={{ fontSize: "22px" }} />
            <p>Set Colors</p>
          </div>
          <div
            className="single-tab"
            onClick={() => handleRoute("logo")}
            style={{
              backgroundColor: navigate?.isLogo ? "#fe5b24" : "#EFEFEF",
              color: navigate?.isLogo ? "white" : "#838383",
            }}
          >
            <FaImages style={{ fontSize: "22px" }} />
            <p>Logo Image</p>
          </div>
          <div
            className="single-tab"
            onClick={() => handleRoute("custom")}
            style={{
              backgroundColor: navigate?.isCustom ? "#fe5b24" : "#EFEFEF",
              color: navigate?.isCustom ? "white" : "#838383",
            }}
          >
            <IoQrCodeOutline style={{ fontSize: "22px" }} />
            <p>Customize</p>
          </div>
        </div>
        {navigate?.isContent && (
          <Content
            editQrInfo={editQrInfo}
            qrInfo={qrInfo}
            handleRoute={handleRoute}
          />
        )}
        {navigate?.isColor && (
          <SetColor
            editQrInfo={editQrInfo}
            qrInfo={qrInfo}
            handleRoute={handleRoute}
            swapForColors={swapForColors}
            swapIColors={swapIColors}
          />
        )}
        {navigate?.isLogo && (
          <SetLogo
            editQrInfo={editQrInfo}
            qrInfo={qrInfo}
            handleRoute={handleRoute}
          />
        )}
        {navigate?.isCustom && (
          <QrCustomize
            editQrInfo={editQrInfo}
            qrInfo={qrInfo}
            handleRoute={handleRoute}
          />
        )}
      </div>
    </div>
  );
};

export default QrEditSection;
