import InputContainer from "../components/authComponents/InputContainer";
import ImageContainer from "../components/authComponents/ImageContainer";

const ForgetPassword = () => {
  return (
    <div className="w-[100%] h-[100vh] flex justify-between">
      <InputContainer isLogin={false} isForgot={true} isUpdate={false} />
      <ImageContainer isLogin={false} />
    </div>
  );
};

export default ForgetPassword;
