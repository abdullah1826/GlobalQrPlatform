import React from "react";
import { bodyShape, iFrameShape, iShape } from "../../assets/returnSocialIcons";

interface SetColorProps {
  editQrInfo: (infoValue: string | number[], key: string) => void;
  handleRoute: (route: string) => void;
  qrInfo: {
    value: string;
    forColor: string;
    iColor: string;
    forColor2: string;
    iColor2: string;
    bgColor: string;
    logo: string| undefined;
    bShape: "squares" | "dots" | undefined;
    iShape: [number, number, number, number];
    fShape: [number, number, number, number];
  };
}

const QrCustomize: React.FC<SetColorProps> = ({
  editQrInfo,
  //   qrInfo,
  handleRoute,
}) => {
  return (
    <div className="customize-main">
      <div className="customize-inner">
        <div className="option">
          <h2>Body Shape</h2>
          <div className="all-options">
            {bodyShape?.map((elm) => {
              return (
                <div
                  className="single-option"
                  onClick={() => editQrInfo(elm?.bShape, "bShape")}
                >
                  <img src={elm?.img} alt="" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="option">
          <h2>Eye Frame Shape</h2>
          <div className="all-options">
            {iFrameShape?.map((elm) => {
              return (
                <div
                  className="single-option"
                  onClick={() => editQrInfo(elm?.fShape, "fShape")}
                >
                  <img src={elm?.img} alt="" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="option">
          <h2>Eye Shape</h2>
          <div className="all-options">
            {iShape?.map((elm) => {
              return (
                <div
                  className="single-option"
                  onClick={() => editQrInfo(elm?.iShape, "iShape")}
                >
                  <img src={elm?.img} alt="" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="custom-btn-container">
          <button className="button1" onClick={() => handleRoute("logo")}>
            Back
          </button>
          {/* <button className="button2"></button> */}
        </div>
      </div>
    </div>
  );
};

export default QrCustomize;
