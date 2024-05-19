import ImageContainer from "../components/authComponents/ImageContainer";
import InputContainer from "../components/authComponents/InputContainer";

const Signup = () => {
  return (
    <div className="w-[100%] h-[100vh] flex justify-between">
      <InputContainer isLogin={false} />
      <ImageContainer isLogin={false} />
    </div>
  );
};

export default Signup;
