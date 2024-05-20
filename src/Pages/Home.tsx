import { useState } from "react";
import "../Styles/home.scss";
import logo from "../imgs/logo.png";
import QrContainerSection from "../components/QrContainerSection";
import QrEditSection from "../components/QrEditSection";

const Home = () => {
  let [qrInfo, setQrInfo] = useState<{
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
  }>({
    value: "",
    forColor: "#FE5B24",
    forColor2: "#000000",
    iColor: "#FE5B24",
    iColor2: "#000000",
    bgColor: "#ffffff",
    logo: "",
    bShape: "squares",
    iShape: [0, 0, 0, 0],
    fShape: [0, 0, 0, 0],
  });

  const swapForColors = () => {
    setQrInfo((prevQrInfo) => ({
      ...prevQrInfo,
      forColor: prevQrInfo.forColor2,
      forColor2: prevQrInfo.forColor,
    }));
  };

  const swapIColors = () => {
    setQrInfo((prevQrInfo) => ({
      ...prevQrInfo,
      iColor: prevQrInfo.iColor2,
      iColor2: prevQrInfo.iColor,
    }));
  };

  const editQrInfo = (
    infoValue: string | number[] | File | "squares" | "dots" | undefined,
    key: string
  ) => {
    setQrInfo({ ...qrInfo, [key]: infoValue });
  };
  console.log(qrInfo.fShape);

  return (
    <div className="home-main">
      <div className="home-inner">
        <div className="logo-container">
          <img src={logo} alt="" className="h-[95%] w-[90%] object-cover" />
        </div>
        <div className="main-container">
          <QrEditSection
            editQrInfo={editQrInfo}
            qrInfo={qrInfo}
            swapForColors={swapForColors}
            swapIColors={swapIColors}
          />
          <QrContainerSection qrInfo={qrInfo} />
        </div>
      </div>
    </div>
  );
};

export default Home;
