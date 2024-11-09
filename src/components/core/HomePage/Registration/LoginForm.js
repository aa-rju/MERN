import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const LoginForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    setIsLoggedIn(true);
    toast.success("logged in");
    navigate("/dashboard");
  }
  return (
    <div className="flex flex-col mt-6 text-lg">
      <form onSubmit={submitHandler} className="flex flex-col w-full gap-y-1	">
        <label className="w-full">
          <p className="text-[0.875rem] text-white mb-1 leading-[1.75rem] text-lg">
            Email Address<sup className="text-pink-700">*</sup>
          </p>
          <input
            required
            type="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Enter email id"
            name="email"
            className="bg-white rounded-[0.5rem] w-full p-[12px]"
          />
        </label>
        <br />
        <label className="w-full relative">
          <p className="text-[0.875rem] text-white mb-1 leading-[1.75rem] text-lg">
            Password<sup className="text-pink-700">*</sup>
          </p>
          <input
            required
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={changeHandler}
            placeholder="Enter Password"
            name="password"
            className="bg-white rounded-[0.5rem] w-full p-[12px]"
          />

          <span
            className="absolute right-3 top-[38px] cursor-pointer "
            onClick={() => {
              setShowPassword((prev) => !prev);
            }}
          >
            {showPassword ? (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            )}
          </span>

          <Link to="#">
            <p className="text-xs mt-1 text-green-400 max-w-max ml-auto ">
              Forgot Password
            </p>
          </Link>
        </label>
        <br />
        <button className="bg-yellow-300 rounded-[8px] font-medium text-white px-[12px] py-[12px] mt-4">
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
