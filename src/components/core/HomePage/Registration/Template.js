import React from "react";
// import frameImage from "../assests/frameImage.png";
import SignUpForm from "../SignUpForm";
import LoginForm from "./LoginForm";
import { FcGoogle } from "react-icons/fc";

const Template = ({ title, desc1, desc2, image, formType, setIsLoggedIn }) => {
  return (
    <div className="flex  justify-between w-11/12 max-w-[1160px] py-12 mx-auto gap-y-0">
      <div className=" w-11/12 max-w-[450px] mx-0">
        <h1 className="text-white font-semibold text-[1.85rem] leading-[2.375rem]">
          {title}
        </h1>
        <p className="text-[1.125rem leading[1.625rem] mt-4">
          <span className="text-white">{desc1}</span>
          <br />
          <span className="text-blue-100 italic">{desc2}</span>
        </p>

        {formType === "SignUp" ? (
          <SignUpForm setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <LoginForm setIsLoggedIn={setIsLoggedIn} />
        )}

        <div className="flex w-full items-center my-4 gap-x-4">
          <div className="w-full h-[1px] bg-black "></div>
          <p className="text-black font-medium leading-[1.75rem]">OR</p>
          <div className="w-full h-[1px] bg-black "></div>
        </div>
        <button className="w-full flex justify-center items-center rounded-[8px] font-medium text-white border px-[12px] py-[8px] gap-x-2 mt-6 ">
          <FcGoogle />
          <p>Sign Up with Google</p>
        </button>
      </div>
      <div className="relative w-11/12 max-w-[450px]">
        {/* <img src={frameImage} alt="" width={558} height={504} loading="lazy" /> */}
        <img
          className="absolute -top-4 right-4"
          src="https://scontent.fktm1-1.fna.fbcdn.net/v/t39.30808-6/462804520_1099505735129760_6286062070882968077_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=RaNczmZNWG8Q7kNvgH5tAp4&_nc_ht=scontent.fktm1-1.fna&_nc_gid=A3ifV1G3LwxCg0Bt4CLxLwb&oh=00_AYBV7p89xID8ZYLM-Ydv7I72lpfmMfGMkDh5lFpBBjA4BA&oe=6717DD0A"
          alt=""
          width={300}
          height={300}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Template;
