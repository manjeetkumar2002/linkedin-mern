import { React, useContext, useState } from 'react';
import logo from "../assets/logo.svg";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authDataContext } from '../context/AuthContext.jsx';
import { userDataContext } from "../context/UserContext.jsx";

const Signup = () => {
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  const { userData, setUserData } = useContext(userDataContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/signup",
        {
          firstName,
          lastName,
          userName,
          email,
          password,
        },
        { withCredentials: true }
      );

      setLoading(false);
      setFirstName("");
      setLastName("");
      setUserName("");
      setEmail("");
      setPassword("");
      navigate("/");
      setUserData(result.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col justify-start items-center">
      {/* Header with logo */}
      <div className="w-full max-w-7xl px-6 py-6 lg:py-8">
        <img 
          className="w-[140px] h-auto object-contain" 
          src={logo} 
          alt="logo" 
        />
      </div>

      {/* Sign Up Form */}
      <form 
        onSubmit={handleSignUp} 
        className="w-full max-w-md mx-4  bg-white rounded-2xl shadow-xl p-8 md:p-10 transition-all duration-300 hover:shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight">
          Create Account
        </h1>
        
        {/* First Name & Last Name - Two Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First Name
            </label>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              type="text"
              placeholder="John"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last Name
            </label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              type="text"
              placeholder="Doe"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
            />
          </div>
        </div>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Username
          </label>
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            type="text"
            placeholder="Choose a username"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type={showPass ? "text" : "password"}
              placeholder="Create a strong password"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 pr-12"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors duration-200"
            >
              {showPass ? (
                <IoMdEyeOff className="text-2xl" />
              ) : (
                <IoMdEye className="text-2xl" />
              )}
            </button>
          </div>
          
          {/* Password strength indicator (visual only) */}
          {password && (
            <div className="mt-2">
              <div className="flex gap-1">
                <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  password.length < 4 ? 'bg-red-400' :
                  password.length < 8 ? 'bg-yellow-400' :
                  'bg-green-400'
                }`}></div>
                <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  password.length < 6 ? 'bg-gray-200' :
                  password.length < 10 ? 'bg-yellow-400' :
                  'bg-green-400'
                }`}></div>
                <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  password.length < 8 ? 'bg-gray-200' :
                  password.length < 12 ? 'bg-yellow-400' :
                  'bg-green-400'
                }`}></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {password.length < 4 ? 'Weak' :
                 password.length < 8 ? 'Fair' :
                 password.length < 12 ? 'Good' :
                 'Strong'} password
              </p>
            </div>
          )}
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3.5 px-4 rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </span>
          ) : (
            "Create Account"
          )}
        </button>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-colors duration-200"
            >
              Sign In
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;