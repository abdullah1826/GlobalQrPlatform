import { IoAddCircleOutline } from "react-icons/io5";
import Sidebar from "../components/Sidebar";
import { RiFileHistoryFill } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { Menu, MenuItem } from "@mui/material";
import { QRCode } from "react-qrcode-logo";
import { TbUnlink } from "react-icons/tb";
import { HiArrowNarrowRight } from "react-icons/hi";
import { FiDownload } from "react-icons/fi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineAutoGraph } from "react-icons/md";
import { IoIosPause } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface qrType {
  name: string;
  url: string;
  forColor: string;
  bgColor: string;
  eyeColor: string;
  logo: string;
  bodyShape: "squares" | "dots" | undefined;
  eyeShape: string;
  frameShape: string;
  status: boolean;
  totalScans: string;
  userId: string;
  _id: string;
}
const History = () => {
  const navigate = useNavigate();

  const [qrs, setQrs] = useState<qrType[]>([]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickListItem = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // const [format, setFormat] = useState<string>("");

  // Function to toggle the state of a specific item.

  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const open2 = Boolean(anchorEl2);

  const handleClickListItem2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
    console.log("work");
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const token = localStorage.getItem("gbQrId");
  let baseUrl = import.meta.env.VITE_BASE_URL;
  const [format, setFormat] = useState<string>("png");

  // ---------------------------------------------get api call-------------------------------------

  const getAnalyticsData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/qr/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQrs(response.data?.data);

      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // ---------------------------------------------delete call-------------------------------------

  const deleteQr = async (id: string) => {
    try {
      const response = await axios.post(
        `${baseUrl}/qr/delete`,
        { qrId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQrs(response.data?.data);
      console.log(response.data);
      handleClose();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // ---------------------------------------------update Analytics Status-------------------------------------
  const updateAnalyticsStatus = async (
    type: string,
    qrId: string | null | undefined,
    status: boolean
  ) => {
    try {
      const response = await axios.post(
        `${baseUrl}/analytics/update`,
        { type, qrId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQrs(response?.data?.data);
      // setStatValue("");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // -------------------------------------------------Download Qr----------------------------------------------

  const downloadQRCode = async (
    format: "jpg" | "png" | "pdf" | string,
    width: number,
    height: number,
    qrId: string
  ) => {
    try {
      const response = await axios.post(
        `${baseUrl}/analytics/update`,
        { type: "download", qrId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const qrCodeElement = document.getElementById(qrId);

      if (!qrCodeElement) {
        console.error("QR code container not found.");
        return;
      }

      interface QRCodeOptions {
        scale: number;
        width?: number;
        height?: number;
      }

      const options: QRCodeOptions = { scale: 100 / 100 };
      if (width && height) {
        options.width = width;
        options.height = height;
      }

      qrCodeElement.style.margin = "0";
      qrCodeElement.style.padding = "0";
      qrCodeElement.style.border = "none";

      if (format === "pdf") {
        html2canvas(qrCodeElement, options).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
          pdf.save("QRCode.pdf");
        });
      } else {
        html2canvas(qrCodeElement, options).then((canvas) => {
          const imgData = canvas.toDataURL(`image/${format}`, 100 / 100);
          const downloadLink = document.createElement("a");
          downloadLink.href = imgData;
          downloadLink.download = `QRCode.${format}`;
          downloadLink.click();
        });
      }

      // setStatValue("");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAnalyticsData();
  }, []);

  const stringToArray = (
    stringValue: string
  ): [number, number, number, number] => {
    if (stringValue && stringValue != undefined) {
      const stringArray = stringValue.split(",");
      const numberArray = stringArray.map((str) => parseInt(str, 10)) as [
        number,
        number,
        number,
        number
      ]; // Type assertion

      return numberArray;
    } else {
      throw new Error("Invalid input");
    }
  };

  console.log(qrs);

  return (
    <div className="w-[100%] h-[100vh] flex justify-between z-10">
      <Sidebar />
      <div className="h-[100%] w-[78%] flex justify-center items-center">
        <div className="h-[95%] w-[95%] flex flex-col justify-between z-10">
          <div className="w-[100%] flex justify-between items-center h-[11%]">
            <div className="flex items-center gap-2 ">
              <RiFileHistoryFill className="text-[34px] text-[#FE5B24]" />
              <p className="font-[600] text-[24px] text-[#FE5B24]">History</p>
              <div className="h-[34px]  relative w-[80px]">
                <p className="font-[400] text-[11px] text-[#AFAFAF] absolute  bottom-0">
                  ({qrs?.length} QR Codes)
                </p>
              </div>
            </div>
            <div className="w-[35%]  flex justify-around">
              {/* <div className="w-[130px] h-[53px] rounded-[12px] shadow-lg flex items-center justify-center  cursor-pointer">
                <Checkbox defaultChecked color="warning" />

                <p className="font-[400] text-[16px] text-[#909090] flex items-center mr-[10px]">
                  Select All
                </p>
              </div> */}

              <div className="w-[130px] h-[53px] rounded-[12px] shadow-lg flex items-center justify-center gap-[5px] cursor-pointer">
                <CiFilter className="text-[#FE5B24] text-[20px]" />
                <p className="font-[400] text-[16px] text-[#FE5B24] flex items-center">
                  Activated
                </p>
                <IoIosArrowDown className="text-[#FE5B24] text-[20px]" />
              </div>

              <div
                className="w-[185px] h-[53px] rounded-[12px] shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                onClick={() => navigate("/dashboard/create")}
              >
                <IoAddCircleOutline className="text-[#FE5B24] text-[20px]" />
                <p className="font-[400] text-[16px] text-[#FE5B24] flex items-center">
                  Create QR Code
                </p>
              </div>
            </div>
          </div>

          <div className="w-[100%] h-[85%] overflow-y-scroll">
            {qrs?.map((qr, i) => {
              return (
                <div
                  className="w-[100%] h-[150px] border rounded-[19px] shadow-md flex justify-around items-center relative overflow-visible mt-7"
                  key={i}
                >
                  <div className="w-[90%] h-[60px]  absolute top-[-20px] z-20 flex justify-end">
                    {qr?.status ? (
                      <div
                        className="h-[40px] w-[140px] border bg-white border-[#28DE18] rounded-[11px] flex cursor-pointer justify-center items-center gap-1 font-[600] text-[16px] text-[#28DE18]"
                        onClick={() =>
                          updateAnalyticsStatus("status", qr?._id, !qr?.status)
                        }
                      >
                        <MdOutlineAutoGraph className="text-xl text-[#28DE18]" />
                        Active
                      </div>
                    ) : (
                      <div
                        className="h-[40px] w-[140px] border bg-white border-[#EE0000] rounded-[11px] flex cursor-pointer justify-center items-center gap-1 font-[600] text-[16px] text-[#EE0000]"
                        onClick={() =>
                          updateAnalyticsStatus("status", qr?._id, !qr?.status)
                        }
                      >
                        <IoIosPause className="text-xl text-[#EE0000]" />
                        Paused
                      </div>
                    )}
                  </div>
                  {/* <Checkbox defaultChecked color="warning" size="large" /> */}

                  <QRCode
                    id={qr?._id}
                    value={`${baseUrl}/qr/${qr?._id}`}
                    fgColor={qr.forColor}
                    bgColor={qr?.bgColor}
                    eyeColor={qr?.eyeColor}
                    qrStyle={qr?.bodyShape}
                    logoImage={qr?.logo}
                    eyeRadius={[
                      {
                        // top/left eye
                        outer: stringToArray(qr?.frameShape),
                        inner: stringToArray(qr?.eyeShape),
                      },
                      {
                        // top/left eye
                        outer: stringToArray(qr?.frameShape),
                        inner: stringToArray(qr?.eyeShape),
                      },
                      {
                        // top/left eye
                        outer: stringToArray(qr?.frameShape),
                        inner: stringToArray(qr?.eyeShape),
                      },
                    ]}
                    size={110}
                  />
                  <div className="flex flex-col justify-between h-[70px]">
                    <p className="text-[#FE5B24] font-[400] text-[16px] ">
                      {qr?.name}
                    </p>
                    <div className="flex gap-2 items-center">
                      <TbUnlink className="text-[20px] text-[#9F9F9F] " />
                      <p className="font-[400] text-[14px] text-[#9F9F9F] w-[230px]">
                        {qr?.url?.length < 30
                          ? qr?.url
                          : qr?.url.slice(0, 30) + "..."}
                      </p>
                    </div>
                  </div>

                  <div className=" flex flex-col  justify-evenly h-[120px] w-[110px]">
                    <p className="font-[400] text-[13px] text-[#AFAFAF]">
                      Total Scans
                    </p>
                    <h2 className="font-[700] text-[48px] w-[110px]">
                      {qr?.totalScans}
                    </h2>
                    <div className="flex items-center cursor-pointer">
                      <p className="text-[#FE5B24] font-[400] text-[16px] ">
                        Details
                      </p>
                      <HiArrowNarrowRight className="text-[#FE5B24] mt-[2px]" />
                    </div>
                  </div>

                  <div
                    className="w-[210px] h-[61px] rounded-[12px] flex bg-[#FE5B24]"
                    onClick={() => downloadQRCode(format, 200, 200, qr?._id)}
                  >
                    <div className="h-[100%] w-[75%] border-r flex justify-center items-center gap-2 cursor-pointer text-[#FFFFFF] font-[500] text-[14px]">
                      <FiDownload className="text-xl" />
                      Download {format}{" "}
                    </div>
                    <button
                      className="h-[100%] w-[25%] flex justify-center items-center "
                      id="download-button"
                      aria-haspopup="listbox"
                      aria-controls="download-menu"
                      // aria-expanded={openMenu ? "true" : undefined}
                      onClick={handleClickListItem2}
                    >
                      <IoIosArrowDown className="text-2xl cursor-pointer text-white" />
                    </button>

                    <Menu
                      id="download-button"
                      anchorEl={anchorEl2}
                      open={open2}
                      onClose={handleClose2}
                      MenuListProps={{
                        "aria-labelledby": "download-button",
                        role: "listbox",
                      }}
                    >
                      <MenuItem
                        onClick={() => {
                          setFormat("png"), handleClose();
                        }}
                        sx={{ display: "flex" }}
                      >
                        .png
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setFormat("jpg"), handleClose();
                        }}
                        sx={{ display: "flex" }}
                      >
                        .jpg
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          setFormat("pdf"), handleClose();
                        }}
                        sx={{ display: "flex" }}
                      >
                        .pdf
                      </MenuItem>
                    </Menu>
                  </div>

                  <div className="h-[100%] flex justify-center items-center">
                    <button
                      id="lang-button"
                      aria-haspopup="listbox"
                      aria-controls="lang-menu"
                      // aria-expanded={openMenu ? "true" : undefined}
                      onClick={handleClickListItem}
                      className="outline-none bg-transparent"
                    >
                      <BsThreeDotsVertical className="text-4xl cursor-pointer text-[#D9D9D9]" />
                    </button>
                  </div>
                  <Menu
                    id="lang-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "lang-button",
                      role: "listbox",
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        navigate(`/dashboard/create/${qr?._id}`);
                        // handleGetValue("weakly");
                      }}
                      sx={{ display: "flex" }}
                    >
                      <p className="font-[500] ml-2 text-base">Edit</p>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        deleteQr(qr?._id);
                      }}
                      sx={{ display: "flex" }}
                    >
                      <p className="font-[500] ml-2 text-base">Delete</p>
                    </MenuItem>
                  </Menu>
                </div>
              );
            })}

            {/* <div className="w-[100%] h-[150px] border rounded-[19px] shadow-md flex justify-around items-center relative overflow-visible mt-8">
              <div className="w-[90%] h-[60px]  absolute top-[-20px] z-20 flex justify-end">
                <div className="h-[40px] w-[140px] border bg-white border-[#EE0000] rounded-[11px] flex cursor-pointer justify-center items-center gap-1 font-[600] text-[16px] text-[#EE0000]">
                  <IoIosPause className="text-xl text-[#EE0000]" />
                  Paused
                </div>
              </div>
              <Checkbox defaultChecked color="warning" size="large" />
              <QRCode
                value="https://github.com/gcoro/react-qrcode-logo"
                size={110}
              />
              <div className="flex gap-2 items-center ">
                <TbUnlink className="text-[20px] text-[#9F9F9F] " />
                <p className="font-[400] text-[14px] text-[#9F9F9F]">
                  https://www.instagram.com/
                </p>
              </div>

              <div className=" flex flex-col items-center justify-evenly h-[120px]">
                <p className="font-[400] text-[13px] text-[#AFAFAF]">
                  Total Scans
                </p>
                <h2 className="font-[700] text-[48px] ">12</h2>
                <div className="flex items-center cursor-pointer">
                  <p className="text-[#FE5B24] font-[400] text-[16px] ">
                    Details
                  </p>
                  <HiArrowNarrowRight className="text-[#FE5B24] mt-[2px]" />
                </div>
              </div>

              <div className="w-[210px] h-[61px] rounded-[12px] flex bg-[#FE5B24]">
                <div className="h-[100%] w-[75%] border-r flex justify-center items-center gap-2 cursor-pointer text-[#FFFFFF] font-[500] text-[14px]">
                  <FiDownload className="text-xl" />
                  Download PNG
                </div>
                <div className="h-[100%] w-[25%] flex justify-center items-center ">
                  <IoIosArrowDown className="text-2xl cursor-pointer text-white" />
                </div>
              </div>

              <div className="h-[100%] flex justify-center items-center">
                <BsThreeDotsVertical className="text-4xl cursor-pointer text-[#D9D9D9]" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
