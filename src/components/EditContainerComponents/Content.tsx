import React from "react";
import Switch from "@mui/material/Switch";
import { useNavigate } from "react-router-dom";
interface SetColorProps {
  editQrInfo: (infoValue: string, key: string) => void;
  handleRoute: (route: string) => void;
  qrInfo: {
    value: string;
    forColor: string;
    forColor2: string;
    iColor: string;
    iColor2: string;
    bgColor: string;
    logo: string | undefined;
    bShape: "squares" | "dots" | undefined;
    iShape: number[];
    fShape: number[];
  };
}
const Content: React.FC<SetColorProps> = ({
  editQrInfo,
  qrInfo,
  handleRoute,
}) => {
  const navigation = useNavigate();
  return (
    <div className="content-main">
      <div className="content-inner">
        <div className="input-container">
          <p>Your URL</p>
          <input
            type="text"
            onChange={(e) => editQrInfo(e.target.value, "value")}
            value={qrInfo?.value}
          />
        </div>

        <div
          className="toggle-section"
          onClick={() => navigation("dashboard/signin")}
        >
          <Switch disabled />
          <p>Statics And Editability</p>
        </div>

        <div className="content-btn-container">
          <button onClick={() => handleRoute("color")}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Content;
