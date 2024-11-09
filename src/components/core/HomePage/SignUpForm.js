import React from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
// import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignUpForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState("student");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  function submitHandler(event) {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords didn't match.");
      return;
    }
    setIsLoggedIn(true);
    toast.success("Account created");
    const accountData = {
      ...formData,
    };

    const finalData = {
      ...accountData,
      accountType,
    };
    console.log("Printing final account data");
    console.log(finalData);

    navigate("/dashboard");
  }
  return (
    <div className="flex flex-col mt-6 text-lg">
      {/* student-Instructor tab */}
      <div className="flex bg-green-400 rounded-full max-w-max p-1 gap-x-1">
        <button
          className={`${
            accountType === "student"
              ? "bg-green-300 text-white rounded-full py-2 px-5"
              : "bg-transparent text-dark py-2 px-5 rounded-full transition-all duration-200"
          }`}
          onClick={() => setAccountType("student")}
        >
          Student
        </button>
        <button
          className={`${
            accountType === "instructor"
              ? "bg-green-300 text-white rounded-full py-2 px-5"
              : "bg-transparent text-dark py-2 px-5 rounded-full transition-all duration-200"
          }`}
          onClick={() => setAccountType("instructor")}
        >
          Instructor
        </button>
      </div>
      <form onSubmit={submitHandler} className="flex flex-col w-full gap-y-1	">
        <div className="flex gap-x-5">
          <label className="w-full">
            <p className="text-[0.875rem] text-white mb-1 leading-[1.75rem] text-lg">
              First Name <sup className="text-pink-700">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              onChange={changeHandler}
              placeHolder="Enter First Name"
              value={formData.firstName}
              className="bg-white rounded-[0.5rem] w-full p-[12px]"
            />
          </label>

          <label className="w-full">
            <p className="text-[0.875rem] text-white mb-1 leading-[1.75rem] text-lg">
              Last Name <sup className="text-pink-700">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              onChange={changeHandler}
              placeHolder="Enter Last Name"
              value={formData.lastName}
              className="bg-white rounded-[0.5rem] w-full p-[12px]"
            />
          </label>
        </div>

        <label className="w-full">
          <p className="text-[0.875rem] text-white mb-1 leading-[1.75rem] text-lg">
            Email <sup className="text-pink-700">*</sup>
          </p>
          <input
            required
            type="email"
            name="email"
            onChange={changeHandler}
            placeHolder="Enter Email Address"
            value={formData.email}
            className="bg-white rounded-[0.5rem] w-full p-[12px]"
          />
        </label>
        <div className="flex gap-x-5">
          <label className="w-full relative">
            <p className="text-[0.875rem] text-white mb-1 leading-[1.75rem] text-lg">
              Create Password <sup className="text-pink-700">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={changeHandler}
              placeHolder="Enter Password"
              value={formData.password}
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
          </label>

          <label className="w-full relative">
            <p className="text-[0.875rem] text-white mb-1 leading-[1.75rem] text-lg">
              Confirm Password <sup className="text-pink-700">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={changeHandler}
              placeHolder="Confirm Password"
              value={formData.confirmPassword}
              className="bg-white rounded-[0.5rem] w-full p-[12px]"
            />
            <span
              className="absolute right-3 top-[38px] cursor-pointer "
              onClick={() => {
                setShowConfirmPassword((prev) => !prev);
              }}
            >
              {showConfirmPassword ? (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
        </div>

        <div className="w-full">
          <button className="w-full bg-yellow-300 rounded-[8px] font-medium text-white px-[12px] py-[12px] mt-4">
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
