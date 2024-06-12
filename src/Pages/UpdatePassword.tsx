import InputContainer from "../components/authComponents/InputContainer";
import ImageContainer from "../components/authComponents/ImageContainer";

const UpdatePassword = () => {
  return (
    <div className="w-[100%] h-[100vh] flex justify-center">
      <InputContainer isLogin={false} isForgot={false} isUpdate={true} />
      {/* <ImageContainer isLogin={false} /> */}
    </div>
  );
};

export default UpdatePassword;
