import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import login_image from "../assets/parental.jpg";

const Signup = () => {
  const [formData, setFormData] = useState({
    Fullname: "",
    Username: "",
    email: "",
    password: "",
    avatar: null,
    // coverImage: null,
  });

  const [avatarName, setAvatarName] = useState("");
  // const [coverImageName, setCoverImageName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "file" ? files[0] : value,
    }));

    if (type === "file" && name === "avatar") {
      setAvatarName(files[0] ? files[0].name : "");
    }
    // else if (type === "file" && name === "coverImage") {
    //   setCoverImageName(files[0] ? files[0].name : "");
    // }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const formDataToSend = new FormData();
    formDataToSend.append("Username", formData.Username);
    formDataToSend.append("Fullname", formData.Fullname);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    if (formData.avatar) formDataToSend.append("avatar", formData.avatar);
    // if (formData.coverImage) formDataToSend.append("coverImage", formData.coverImage);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      navigate("/");
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Signup failed, please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${login_image})` }}
    >
      <div className="w-full max-w-md p-8 bg-black/50 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20">
        <h2 className="text-3xl font-semibold text-center text-white mb-8">
          Create Account
        </h2>
        {errorMessage && (
          <p className="text-red-500 text-sm text-center mb-4">
            {errorMessage}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              name="Fullname"
              value={formData.Fullname}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full h-12 px-4 bg-transparent border border-white/30 rounded-xl focus:outline-none focus:border-white text-white placeholder-white/70"
              required
              disabled={isLoading}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70">
              👤
            </span>
          </div>
          <div className="relative">
            <input
              type="text"
              name="Username"
              value={formData.Username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full h-12 px-4 bg-transparent border border-white/30 rounded-xl focus:outline-none focus:border-white text-white placeholder-white/70"
              required
              disabled={isLoading}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70">
              👤
            </span>
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full h-12 px-4 bg-transparent border border-white/30 rounded-xl focus:outline-none focus:border-white text-white placeholder-white/70"
              required
              disabled={isLoading}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70">
              ✉️
            </span>
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password (At least 6 characters)"
              className="w-full h-12 px-4 bg-transparent border border-white/30 rounded-xl focus:outline-none focus:border-white text-white placeholder-white/70"
              required
              disabled={isLoading}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70">
              🔒
            </span>
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-white/70 mb-1">
              Upload Avatar
            </label>
            <div className="relative">
              <input
                type="file"
                name="avatar"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
                disabled={isLoading}
              />
              <div className="w-full h-12 px-4 bg-transparent border border-white/30 rounded-xl flex items-center text-white">
                <span className="flex-1 truncate">
                  {avatarName || "Choose Avatar"}
                </span>
                <span className="text-white/70">📷</span>
              </div>
            </div>
          </div>
          {/* Commented out Cover Image Upload */}
          {/* <div className="relative">
            <label className="block text-sm font-medium text-white/70 mb-1">Upload Cover Image</label>
            <div className="relative">
              <input
                type="file"
                name="coverImage"
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
                disabled={isLoading}
              />
              <div className="w-full h-12 px-4 bg-transparent border border-white/30 rounded-xl flex items-center text-white">
                <span className="flex-1 truncate">{coverImageName || "Choose Cover Image"}</span>
                <span className="text-white/70">🖼️</span>
              </div>
            </div>
          </div> */}
          <button
            type="submit"
            className={`w-full py-3 text-white rounded-xl transition-all duration-200 ${
              isLoading
                ? "bg-green-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 hover:scale-105"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Signing up...
              </span>
            ) : (
              "Continue"
            )}
          </button>
        </form>
        <div className="mt-6 text-center text-white/70 text-sm space-y-2">
          <p>
            Already have an account?{" "}
            <Link
              to="/signup"
              className="text-white font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
          <p>
            By continuing, you agree to soundRanked{" "}
            <a href="#" className="text-white hover:underline">
              Conditions of Use
            </a>{" "}
            and{" "}
            <a href="#" className="text-white hover:underline">
              Privacy Notice
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
