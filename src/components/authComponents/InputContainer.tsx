import React from "react";
import logo from "../../imgs/logo.png";
import google from "../../imgs/Google.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Checkbox } from "@mui/material";

interface SetProps {
  isLogin: boolean;
}

const InputContainer: React.FC<SetProps> = ({ isLogin }) => {
  const [data, setdata] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const getInput = (key: string, value: string) => {
    setdata({ ...data, [key]: value });
  };
  const navigate = useNavigate();
  let baseUrl = import.meta.env.VITE_BASE_URL;

  const signUp = () => {
    axios
      .post(`${baseUrl}/auth/register`, {
        email: data?.email,
        password: data?.password,
      })
      .then((res) => {
        console.log("the response", res.data);
        if (res?.data?.status === true) {
          navigate("/dashboard/signin");
          // toast.success(res?.data?.status?.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signIn = async () => {
    axios
      .post(`${baseUrl}/auth/login`, {
        email: data?.email,
        password: data?.password,
      })
      .then(async (res) => {
        console.log("the response", res);
        if (res?.data?.status === true) {
          const securePromise = localStorage.setItem(
            "gbQrId",
            res?.data?.token
          );
          localStorage.setItem("gbEmail", data?.email);
          try {
            await Promise.resolve(securePromise);
            toast.success("Login Successfuly");
            navigate("/dashboard");
          } catch (error) {
            console.error("Error updating objects:", error);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("api end working......");
  };

  const handleFunction = () => {
    if (isLogin) {
      return signIn();
    } else {
      return signUp();
    }
  };

  return (
    <div className="h-[100%] w-[50%] border flex justify-center items-center relative">
      <div
        className=" w-[400px]  flex flex-col justify-between items-center mb-4"
        style={{ height: window.innerHeight < 700 ? "85%" : "75%" }}
      >
        <img src={logo} alt="" className="w-[200px] h-[90px] object-cover" />
        <div>
          <h2 className="font-[500] text-[32px] text-center">Welcome!</h2>
          <p className="font-[400] text-[18px] text-[#848484] text-center">
            {`Please enter your credentials to ${
              isLogin ? "Sign in" : "Sign up"
            }!`}
          </p>
        </div>
        <div className="w-[100%]">
          <div className="w-[100%]">
            <h2 className="font-[500] text-[#9FA598] text-[20px]">Email</h2>
            <input
              type="text"
              className="w-[98%] pl-[2%] h-[55px] outline-none border border-[#D1D5DB] rounded-[18px]"
              onChange={(e) => getInput("email", e.target.value)}
              value={data?.email}
            />
          </div>

          <div className="w-[100%] mt-3">
            <h2 className="font-[500] text-[#9FA598] text-[20px]">Password</h2>
            <input
              type="text"
              className="w-[98%] pl-[2%] h-[55px] outline-none border border-[#D1D5DB] rounded-[18px]"
              onChange={(e) => getInput("password", e.target.value)}
              value={data?.password}
            />
          </div>

          {!isLogin && (
            <div className="w-[100%] flex items-center ">
              <Checkbox defaultChecked color="warning" />
              <p className="text-xs text-[#848484]">
                I agree with Terms of Service , Privacy Policy, Acceptable Use
                Policy and Data Processing Agreement{" "}
              </p>
            </div>
          )}
        </div>

        <div
          className="w-[100%] h-[57px] bg-[#FE5B24] rounded-[18px] mt-2 flex justify-center items-center text-white font-[600] text-[21px] cursor-pointer"
          onClick={() => handleFunction()}
        >
          {isLogin ? "Sign in" : "Sign up"}
        </div>

        <div className="w-[100%] h-[57px] bg-[white] rounded-[18px]  flex justify-center items-center text-[#00000080] font-[600] text-[21px] shadow-md border gap-2 cursor-pointer mt-3">
          <img src={google} alt="" className="h-[30px] w-[30px]" />
          <p>Continue With Google</p>
        </div>
      </div>
      <div className="w-[100%] flex justify-center items-center absolute bottom-3 text-[18px] font-[600] text-[#9FA598]">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span
          className="text-[#FE5B24] ml-1 cursor-pointer"
          onClick={() =>
            isLogin === true
              ? navigate("/dashboard/signup")
              : navigate("/dashboard/signin")
          }
        >
          {isLogin ? "Sign up" : "Sign in"}
        </span>
      </div>
      {/* <ToastContainer
        position="bottom-left"
        autoClose={1000}
        theme="colored"
        hideProgressBar
      /> */}
    </div>
  );
};

export default InputContainer;
