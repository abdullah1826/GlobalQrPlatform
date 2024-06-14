import React from "react";
import logo from "../../imgs/logo.png";
import google from "../../imgs/Google.png";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { Checkbox } from "@mui/material";
import { ClipLoader } from "react-spinners";
import { PiEyeClosedThin } from "react-icons/pi";
import { PiEyeThin } from "react-icons/pi";
import { useGoogleLogin } from "@react-oauth/google";
import toast, { Toaster } from "react-hot-toast";
// import { jwtDecode } from "jwt-decode";

interface SetProps {
  isLogin: boolean;
  isForgot: boolean;
  isUpdate: boolean;
}

const InputContainer: React.FC<SetProps> = ({
  isLogin,
  isForgot,
  isUpdate,
}) => {
  const { id } = useParams();
  const [data, setdata] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const [ConfirmPass, setConfirmPass] = useState<{
    show: boolean;
    password: string;
  }>({
    show: false,
    password: "",
  });

  const [showPass, setShowPass] = useState<boolean>(false);

  const getInput = (key: string, value: string) => {
    setdata({ ...data, [key]: value });
  };

  const [checked, setChecked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  let baseUrl = import.meta.env.VITE_BASE_URL;

  const signUp = () => {
    setLoading(true);
    axios
      .post(`${baseUrl}/auth/register`, {
        email: data?.email,
        password: data?.password,
      })
      .then((res) => {
        console.log("the response", res.data);
        if (res?.data?.status === true) {
          toast.success(res?.data?.msg);
          setLoading(false);
          navigate("/dashboard/signin");
          // toast.success(res?.data?.status?.msg);
        } else {
          toast.error(res?.data?.msg);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(true);
      });
  };

  const signIn = async () => {
    setLoading(true);
    axios
      .post(`${baseUrl}/auth/login`, {
        email: data?.email,
        password: data?.password,
      })
      .then(async (res) => {
        console.log("the response", res);
        if (res?.data?.status === true) {
          setLoading(false);
          if (checked) {
            localStorage.setItem("gqrSigned", "true");
            var securePromise = localStorage.setItem(
              "gbQrId",
              res?.data?.token
            );
          } else {
            localStorage.setItem("gqrSigned", "false");
            var securePromise = localStorage.setItem(
              "gbQrId",
              res?.data?.token
            );
            sessionStorage.setItem("gbQrId", res?.data?.token);
          }

          localStorage.setItem("gbEmail", data?.email);
          try {
            await Promise.resolve(securePromise);

            navigate("/dashboard");
            window.location.reload();
            toast.success("Login Successfuly");
          } catch (error) {
            console.error("Error updating objects:", error);
          }
        } else {
          toast.error(res?.data?.msg);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("api end working......");
  };

  const forgetPassword = () => {
    setLoading(true);
    axios
      .post(`${baseUrl}/auth/forgetPassword`, {
        email: data?.email,
      })
      .then(async (res) => {
        console.log("the response", res);
        if (res?.data?.status === true) {
          setLoading(false);
          toast.success(res?.data?.message);
        } else {
          toast.error(res?.data?.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const resetPassword = () => {
    if (data?.password === ConfirmPass?.password) {
      setLoading(true);
      axios
        .post(`${baseUrl}/auth/resetPassword`, {
          newPassword: data?.password,
          id,
        })
        .then(async (res) => {
          console.log("the response", res);
          if (res?.data?.status === true) {
            setConfirmPass({ ...ConfirmPass, password: "" });
            setdata({ ...data, password: "" });
            setLoading(false);
            toast.success(res?.data?.message);
            navigate("/dashboard/signin");
          } else {
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    } else {
      toast.error("The new password does not match the confirm password");
    }
  };

  const handleFunction = () => {
    if (isLogin) {
      return signIn();
    } else if (isForgot) {
      forgetPassword();
    } else if (isUpdate) {
      resetPassword();
    } else {
      return signUp();
    }
  };

  const fetchUserDataFromGoogle = async (token: string) => {
    console.log(token);
    try {
      // Fetch user information from Google using the credential
      const userInfoResponse = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      axios
        .post(`${baseUrl}/auth/googleAuth`, {
          email: userInfoResponse?.data?.email,
        })
        .then(async (res) => {
          console.log("the response", res);
          if (res?.data?.status === true) {
            const securePromise = localStorage.setItem(
              "gbQrId",
              res?.data?.token
            );
            localStorage.setItem("gbEmail", userInfoResponse?.data?.email);
            try {
              await Promise.resolve(securePromise);

              navigate("/dashboard");
              window.location.reload();
              toast.success("Login Successfuly");
            } catch (error) {
              console.error("Error updating objects:", error);
            }
          } else {
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      console.log("User Info:", userInfoResponse);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) =>
      fetchUserDataFromGoogle(tokenResponse?.access_token),
  });
  console.log("testing");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  console.log(checked);

  return (
    <div className="h-[100%] w-[50%]  flex justify-center items-center relative">
      <Toaster />
      <div
        className=" w-[400px]  flex flex-col  items-center mb-4 "
        style={{
          height: window.innerHeight < 700 ? "85%" : "75%",
          justifyContent: isForgot ? "space-evenly" : "space-between",
        }}
      >
        <img src={logo} alt="" className="w-[200px] h-[90px] object-cover" />
        <div>
          <h2 className="font-[500] text-[32px] text-center">Welcome!</h2>
          {isForgot ? (
            <p className="font-[400] text-[18px] text-[#848484] text-center">
              Please enter your email to reset password
            </p>
          ) : isUpdate ? (
            <p className="font-[400] text-[18px] text-[#848484] text-center">
              Please enter new password to update
            </p>
          ) : (
            <p className="font-[400] text-[18px] text-[#848484] text-center">
              {`Please enter your credentials to ${
                isLogin ? "Sign in" : "Sign up"
              }!`}
            </p>
          )}
        </div>
        <div className="w-[100%]">
          {!isUpdate && (
            <div className="w-[100%]">
              <h2 className="font-[500] text-[#9FA598] text-[20px]">Email</h2>
              <input
                type="text"
                className="w-[100%] pl-[2%] h-[55px] outline-none border border-[#D1D5DB] rounded-[18px]"
                onChange={(e) => getInput("email", e.target.value)}
                value={data?.email}
              />
            </div>
          )}

          {!isForgot && (
            <div className="w-[100%] mt-3">
              <h2 className="font-[500] text-[#9FA598] text-[20px]">
                {isUpdate && "New"} Password
              </h2>

              <div className="w-[100%] h-[55px]  border border-[#D1D5DB] rounded-[18px] flex justify-center items-center relative">
                {showPass ? (
                  <PiEyeClosedThin
                    className="absolute right-3 text-xl cursor-pointer"
                    onClick={() => setShowPass(false)}
                  />
                ) : (
                  <PiEyeThin
                    className="absolute right-3 text-xl cursor-pointer"
                    onClick={() => setShowPass(true)}
                  />
                )}

                <input
                  type={showPass ? "text" : "password"}
                  className="w-[100%] h-[98%] pl-[2%] outline-none rounded-[18px]"
                  onChange={(e) => getInput("password", e.target.value)}
                  value={data?.password}
                />
              </div>
            </div>
          )}

          {isUpdate && (
            <div className="w-[100%] mt-3">
              <h2 className="font-[500] text-[#9FA598] text-[20px]">
                Confirm Password
              </h2>

              <div className="w-[98%] h-[55px]  border border-[#D1D5DB] rounded-[18px] flex justify-center items-center relative">
                {ConfirmPass?.show ? (
                  <PiEyeClosedThin
                    className="absolute right-3 text-xl cursor-pointer"
                    onClick={() =>
                      setConfirmPass({ ...ConfirmPass, show: false })
                    }
                  />
                ) : (
                  <PiEyeThin
                    className="absolute right-3 text-xl cursor-pointer"
                    onClick={() =>
                      setConfirmPass({ ...ConfirmPass, show: true })
                    }
                  />
                )}

                <input
                  type={ConfirmPass?.show ? "text" : "password"}
                  className="w-[99%] h-[98%] pl-[2%] outline-none rounded-[18px]"
                  onChange={(e) =>
                    setConfirmPass({ ...ConfirmPass, password: e.target.value })
                  }
                  value={ConfirmPass?.password}
                />
              </div>
            </div>
          )}

          {!isLogin && !isForgot && !isUpdate && (
            <div className="w-[100%] flex items-center ">
              <Checkbox defaultChecked color="warning" />
              <p className="text-xs text-[#848484]">
                I agree with Terms of Service , Privacy Policy, Acceptable Use
                Policy and Data Processing Agreement{""}
              </p>
            </div>
          )}
          {isLogin && !isUpdate && (
            <div className="w-[98%] flex justify-between text-[#FE5B24] cursor-pointer items-center">
              <div className="flex items-center text-[15px]">
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                  color="warning"
                  size="small"
                />
                Keep me signed in
              </div>
              <p
                onClick={() => navigate("/dashboard/forget")}
                className="text-[15px]"
              >
                Forget Password?
              </p>
            </div>
          )}
        </div>

        <div
          className="w-[100%] h-[57px] bg-[#FE5B24] rounded-[18px] mt-2 flex justify-center items-center text-white font-[600] text-[21px] cursor-pointer"
          onClick={() => handleFunction()}
        >
          {!loading ? (
            isLogin ? (
              "Sign in"
            ) : isForgot ? (
              "Send"
            ) : isUpdate ? (
              "Update"
            ) : (
              "Sign up"
            )
          ) : (
            <ClipLoader
              color="white"
              loading={true}
              size={45}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </div>

        {!isForgot && !isUpdate && (
          <div
            className="w-[100%] h-[57px] bg-[white] rounded-[18px]  flex justify-center items-center text-[#00000080] font-[600] text-[21px] shadow-md border gap-2 cursor-pointer mt-3"
            onClick={() => login()}
          >
            <img src={google} alt="" className="h-[30px] w-[30px]" />
            <p>Continue With Google</p>
          </div>
        )}
      </div>
      {!isForgot && !isUpdate && (
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
      )}
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
