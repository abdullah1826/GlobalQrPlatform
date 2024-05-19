// import { Radio, Switch } from "@mui/material";
// import React, { useState } from "react";
// import { LiaExchangeAltSolid } from "react-icons/lia";

interface SetColorProps {
  editQrInfo: (infoValue: string, key: string) => void;
  swapForColors: () => void;
  swapIColors: () => void;
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

const SetColor: React.FC<SetColorProps> = ({
  editQrInfo,                  
  qrInfo,
  handleRoute,
  // swapForColors,
  // swapIColors,
}) => {
  // const [selectedValue, setSelectedValue] = useState("a");

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedValue(event.target.value);
  // };

  // const controlProps = (item: string) => ({
  //   checked: selectedValue === item,
  //   onChange: handleChange,
  //   value: item,
  //   name: "color-radio-button-demo",
  //   inputProps: { "aria-label": item },
  // });

  return (
    <div className="color-main">
      <div className="color-inner">
        <div className="color-wraper">
          <div className="foreground-color">
            <h2>Foreground Color</h2>
            {/* <div className="radio-section">
            <div className="single-radio">
              <Radio
                {...controlProps("a")}
                sx={{
                  color: "#FE5B24",
                  "&.Mui-checked": {
                    color: "#FE5B24",
                  },
                }}
              />
              <p>Single Color</p>
            </div>

            <div className="single-radio">
              <Radio
                {...controlProps("b")}
                sx={{
                  color: "#FE5B24",
                  "&.Mui-checked": {
                    color: "#FE5B24",
                  },
                }}
              />
              <p>Gradient Color</p>
            </div>

            <div className="single-radio">
              <Switch defaultChecked color="warning" size="small" />
              <p>Custom Eye Color</p>
            </div>
          </div> */}

            <div className="color-options">
              <div className="single-color">
                <div className="color">
                  <input
                    type="color"
                    onChange={(e) => editQrInfo(e.target.value, "forColor")}
                    value={qrInfo?.forColor}
                  />
                </div>
                <div className="color-value">{qrInfo?.forColor}</div>
              </div>
              {/* <div className="single-color">
              <div className="color">
                <input
                  type="color"
                  onChange={(e) => editQrInfo(e.target.value, "forColor2")}
                  value={qrInfo?.forColor2}
                />
              </div>
              <div className="color-value">{qrInfo?.forColor2}</div>
            </div>

            <div className="single-color">
              <div className="color">
                <div className="exchanger" onClick={() => swapForColors()}>
                  <LiaExchangeAltSolid />
                </div>
              </div>
              <div className="color-value">Linear Gradient</div>
            </div> */}
            </div>
          </div>

          <div className="foreground-color">
            <h2>Background Color</h2>

            <div className="color-options">
              <div className="single-color">
                <div className="color">
                  <input
                    type="color"
                    onChange={(e) => editQrInfo(e.target.value, "bgColor")}
                    value={qrInfo?.bgColor}
                  />
                </div>
                <div className="color-value">{qrInfo?.bgColor}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="color-wraper">
          <div className="foreground-color">
            <h2>Eye Color</h2>

            <div className="color-options">
              <div className="single-color">
                <div className="color">
                  <input
                    type="color"
                    onChange={(e) => editQrInfo(e.target.value, "iColor")}
                    value={qrInfo?.iColor}
                  />
                </div>
                <div className="color-value">{qrInfo?.iColor}</div>
              </div>
              {/* <div className="single-color">
              <div className="color">
                <input
                  type="color"
                  onChange={(e) => editQrInfo(e.target.value, "iColor2")}
                  value={qrInfo?.iColor2}
                />
              </div>
              <div className="color-value">{qrInfo?.iColor2}</div>
            </div>

            <div className="single-color">
              <div className="color">
                <div className="exchanger" onClick={() => swapIColors()}>
                  <LiaExchangeAltSolid />
                </div>
              </div>
              <div className="color-value">Linear Gradient</div>
            </div> */}
            </div>
          </div>
        </div>

        <div className="color-btn-container">
          <button className="button1" onClick={() => handleRoute("content")}>
            Back
          </button>
          <button className="button2" onClick={() => handleRoute("logo")}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetColor;
