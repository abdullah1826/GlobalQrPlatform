import auth from "../../imgs/auth.png";

interface SetProps {
  isLogin: boolean;
}

const ImageContainer: React.FC<SetProps> = ({ isLogin }) => {
  console.log(isLogin);
  return (
    <div className="h-[100%] w-[50%]  bg-[#FE5B24E5] flex justify-center items-center">
      <div
        className="h-[90%] w-[80%] border rounded-[61px] flex justify-center items-center"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 203, 185, 0.3) 0%, #F43E01 100%)",
        }}
      >
        <div className="w-[100%] h-[80%]  flex flex-col justify-between items-center">
          <div className="flex flex-col items-center">
            <h2 className="font-[600] text-[28px] text-white text-center">
              Global QR Codes
            </h2>
            <p className="font-[400] text-[20px] text-white text-center w-[82%]">
              Browse a variety of QR Code types to enrich print & digital media.
            </p>
          </div>

          <img
            src={auth}
            alt=""
            className="w-[90%] object-cover"
            style={{ height: window.innerHeight < 700 ? "55%" : "50%" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageContainer;
