import ImageContainer from "../components/authComponents/ImageContainer";
import InputContainer from "../components/authComponents/InputContainer";

const Login = () => {
  return (
    <div className="w-[100%] h-[100vh] flex justify-between">
      <InputContainer isLogin={true} isForgot={false} isUpdate={false} />
      <ImageContainer isLogin={true} />
    </div>
  );
};

export default Login;
