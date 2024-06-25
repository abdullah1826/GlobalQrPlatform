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
import DetailsModal from "../components/Modals/DetailsModal";
import { ClipLoader } from "react-spinners";

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
  const [filter, setfilter] = useState<qrType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [singleQr, setsingleQr] = useState<qrType>({
    name: "",
    url: "",
    forColor: "",
    bgColor: "",
    eyeColor: "",
    logo: "",
    bodyShape: "squares",
    eyeShape: "",
    frameShape: "",
    status: true,
    totalScans: "",
    userId: "",
    _id: "",
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedQr, setSelectedQr] = useState<string | null | undefined>("");

  const handleClickListItem = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedQr(id);
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

  const [anchorEl3, setAnchorEl3] = useState<null | HTMLElement>(null);
  const open3 = Boolean(anchorEl3);

  const handleClickListItem3 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl3(event.currentTarget);
  };
  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  const [filterType, setFilterType] = useState<"All" | "Paused" | "Active">(
    "All"
  );

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
      setfilter(response.data?.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // ---------------------------------------------delete call-------------------------------------

  const deleteQr = async (id: string | null | undefined) => {
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
      setfilter(response.data?.data);
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
      setSelectedQr(qrId);
      setLoading(true);
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
      setfilter(response.data?.data);
      setLoading(false);
      // setStatValue("");
      console.log(response.data);
    } catch (error) {
      setLoading(false);
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
      const response = await axios.post(
        `${baseUrl}/analytics/update`,
        { type: "download", qrId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // setStatValue("");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getAnalyticsData();
  }, []);

  useEffect(() => {
    if (filterType === "All") {
      getAnalyticsData();
    } else if (filterType === "Active") {
      const activeResult = qrs?.filter((elm) => {
        return elm?.status === true;
      });
      setfilter(activeResult);
    } else if (filterType === "Paused") {
      const inactiveResult = qrs?.filter((elm) => {
        return elm?.status === false;
      });
      setfilter(inactiveResult);
    }
  }, [filterType]);

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

  const [detailModal, setDetailModal] = useState<boolean>(false);
  const handlecloseAction = () => {
    setDetailModal(!detailModal);
  };
  return (
    <div className="w-[100%] h-[100vh] flex justify-between z-10">
      <Sidebar />
      <DetailsModal
        detailModal={detailModal}
        handlecloseAction={handlecloseAction}
        singleQr={singleQr}
      />
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

              <button
                className="w-[130px] h-[53px] rounded-[12px] shadow-lg flex items-center justify-center gap-[5px] cursor-pointer"
                id="filter-button"
                aria-haspopup="listbox"
                aria-controls="filter-menu"
                // aria-expanded={openMenu ? "true" : undefined}
                onClick={handleClickListItem3}
              >
                <CiFilter className="text-[#FE5B24] text-[20px]" />
                <p className="font-[400] text-[16px] text-[#FE5B24] flex items-center">
                  {filterType}
                </p>
                <IoIosArrowDown className="text-[#FE5B24] text-[20px]" />
              </button>

              <Menu
                id="filter-button"
                anchorEl={anchorEl3}
                open={open3}
                onClose={handleClose3}
                MenuListProps={{
                  "aria-labelledby": "filter-button",
                  role: "listbox",
                }}
              >
                <MenuItem
                  onClick={() => {
                    setFilterType("All"), handleClose3();
                  }}
                  sx={{ display: "flex" }}
                >
                  All
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setFilterType("Active"), handleClose3();
                  }}
                  sx={{ display: "flex" }}
                >
                  Active
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setFilterType("Paused"), handleClose3();
                  }}
                  sx={{ display: "flex" }}
                >
                  Paused
                </MenuItem>
              </Menu>

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
            {filter?.map((qr, i) => {
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
                        {loading && selectedQr === qr?._id ? (
                          <ClipLoader
                            color="#28DE18"
                            loading={true}
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        ) : (
                          <>
                            <MdOutlineAutoGraph className="text-xl text-[#28DE18]" />
                            Active
                          </>
                        )}
                      </div>
                    ) : (
                      <div
                        className="h-[40px] w-[140px] border bg-white border-[#EE0000] rounded-[11px] flex cursor-pointer justify-center items-center gap-1 font-[600] text-[16px] text-[#EE0000]"
                        onClick={() =>
                          updateAnalyticsStatus("status", qr?._id, !qr?.status)
                        }
                      >
                        {loading && selectedQr === qr?._id ? (
                          <ClipLoader
                            color="#EE0000"
                            loading={true}
                            size={30}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        ) : (
                          <>
                            <IoIosPause className="text-xl text-[#EE0000]" />
                            Paused
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  {/* <Checkbox defaultChecked color="warning" size="large" /> */}
                  <div className="relative h-[110px] w-[110px]" id={qr?._id}>
                    {qr?.logo && (
                      <div className="h-[50%] w-[50%] left-[32%] absolute overflow-hidden flex justify-center items-center top-[30%]">
                        <img
                          src={qr?.logo}
                          alt=""
                          className=" max-h-[90%] max-w-[90%]  object-fit object-center"
                        />
                      </div>
                    )}
                    <QRCode
                      value={`${baseUrl}/qr/${qr?._id}`}
                      fgColor={qr.forColor}
                      bgColor={qr?.bgColor}
                      eyeColor={qr?.eyeColor}
                      qrStyle={qr?.bodyShape}
                      // logoImage={qr?.logo}
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
                  </div>

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
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => {
                        handlecloseAction(), setsingleQr(qr);
                      }}
                    >
                      <p className="text-[#FE5B24] font-[400] text-[16px] ">
                        Details
                      </p>
                      <HiArrowNarrowRight className="text-[#FE5B24] mt-[2px]" />
                    </div>
                  </div>

                  <div className="w-[210px] h-[61px] rounded-[12px] flex bg-[#FE5B24]">
                    <div
                      className="h-[100%] w-[75%] border-r flex justify-center items-center gap-2 cursor-pointer text-[#FFFFFF] font-[500] text-[14px]"
                      onClick={() => downloadQRCode(format, 130, 130, qr?._id)}
                    >
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
                      id={`${qr?._id}-button`}
                      aria-haspopup="listbox"
                      aria-controls={qr?._id}
                      // aria-expanded={openMenu ? "true" : undefined}
                      onClick={(e) => handleClickListItem(e, qr?._id)}
                      className="outline-none bg-transparent"
                    >
                      <BsThreeDotsVertical className="text-4xl cursor-pointer text-[#D9D9D9]" />
                    </button>
                  </div>
                  <Menu
                    id={qr?._id}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": `${qr?._id}-button`,
                      role: "listbox",
                    }}
                  >
                    <div
                      onClick={() => {
                        navigate(`/dashboard/create/${selectedQr}`);
                        // handleGetValue("weakly");
                      }}
                    >
                      <MenuItem sx={{ display: "flex" }}>
                        <p className="font-[500] ml-2 text-base">Edit</p>
                      </MenuItem>
                    </div>

                    <MenuItem
                      onClick={() => {
                        deleteQr(selectedQr);
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
