import React, { useContext, useEffect, useState } from 'react';
import logo2 from "../assets/logo2.svg";
import { IoSearchSharp } from "react-icons/io5";
import { MdHome } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import dp from "../assets/default-profile.jpg";
import { userDataContext } from "../context/UserContext.jsx";
import { authDataContext } from '../context/AuthContext.jsx';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [activeSearch, setActiveSearch] = useState(false);
  const { userData, setUserData, getProfile } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();
  const [showPopUp, setShowPopUp] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);

  const handleSignOut = async () => {
    try {
      const result = await axios.get(serverUrl + "/api/auth/logout", {
        withCredentials: true,
      });
      setUserData(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/search?query=${searchInput}`,
        { withCredentials: true }
      );
      setSearchData(result.data);
    } catch (error) {
      setSearchData([]);
      console.log(error);
    }
  };

  useEffect(() => {
    if (!searchInput.trim()) {
      setSearchData([]);
      return;
    }

    const timer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  return (
    <nav className="px-4 md:px-6 z-50 left-0 right-0 bg-white/95 backdrop-blur-md w-full h-[72px] fixed top-0 shadow-sm border-b border-gray-100 flex items-center justify-between lg:justify-around relative transition-shadow duration-300 hover:shadow-md">
      
      {/* Left Section */}
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div 
          onClick={() => setActiveSearch(false)}
          className="hover:scale-105 transition-transform duration-200 cursor-pointer"
        >
          <img src={logo2} alt="logo" width={"38px"} className="object-contain" />
        </div>

        {/* Mobile Search Toggle */}
        {!activeSearch && (
          <div>
            <IoSearchSharp
              onClick={() => setActiveSearch(true)}
              className="lg:hidden w-5 h-5 text-gray-500 hover:text-blue-600 cursor-pointer transition-colors duration-200"
            />
          </div>
        )}

        {/* Search Results Dropdown */}
        {searchData.length > 0 && (
          <div className="p-4 flex flex-col gap-2 shadow-xl rounded-xl absolute top-[72px] lg:left-[200px] right-0 w-[100%] lg:w-[380px] bg-white border border-gray-100 max-h-[400px] overflow-y-auto">
            <div className="text-sm font-semibold text-gray-500 px-2 pb-2 border-b border-gray-100">
              Search Results ({searchData.length})
            </div>
            {searchData.map((sea, index) => (
              <div
                key={index}
                onClick={() => getProfile(sea.userName)}
                className="hover:bg-blue-50 cursor-pointer rounded-xl p-3 transition-all duration-200 flex gap-4 items-center border border-transparent hover:border-blue-100"
              >
                <div className="w-[56px] h-[56px] overflow-hidden rounded-full border-2 border-gray-100 flex-shrink-0">
                  <img
                    src={sea.profileImage || dp}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[15px] font-semibold text-gray-800 truncate">
                    {`${sea?.firstName} ${sea?.lastName}`}
                  </div>
                  <div className="text-[13px] text-gray-500 truncate">
                    {sea.headline || "No headline"}
                  </div>
                  <div className="text-xs text-blue-600 mt-0.5">View Profile →</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Search Input */}
        <form
          className={`w-[180px] lg:w-[320px] h-[42px] bg-gray-50 lg:flex items-center gap-3 px-4 py-2 rounded-full border-2 transition-all duration-300 ${
            !activeSearch
              ? "hidden lg:flex hover:border-blue-300 focus-within:border-blue-500"
              : "flex border-blue-400 shadow-lg shadow-blue-100"
          }`}
        >
          <IoSearchSharp className="w-5 h-5 text-gray-400 flex-shrink-0" />
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search users..."
            className="w-full h-full bg-transparent outline-none border-0 text-gray-700 placeholder-gray-400 text-sm"
            autoFocus={activeSearch}
            onBlur={() => {
              if (!searchInput) {
                setTimeout(() => setActiveSearch(false), 200);
              }
            }}
          />
          {searchInput && (
            <button
              type="button"
              onClick={() => {
                setSearchInput("");
                setSearchData([]);
              }}
              className="text-gray-400 hover:text-gray-600 text-sm flex-shrink-0"
            >
              ✕
            </button>
          )}
        </form>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 md:gap-4 relative">
        {/* Popup Menu */}
        {showPopUp && (
          <div className="absolute top-[76px] right-0 w-[280px] min-h-[320px] bg-white shadow-2xl rounded-2xl border border-gray-100 flex flex-col items-center p-6 gap-3 animate-slideDown">
            {/* Profile Section */}
            <div className="w-[80px] h-[80px] overflow-hidden rounded-full border-4 border-blue-100 shadow-md">
              <img
                src={userData.profileImage || dp}
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center">
              <div className="text-[18px] font-semibold text-gray-800">
                {`${userData?.firstName} ${userData?.lastName}`}
              </div>
              <div className="text-sm text-gray-500 mt-0.5">
                {userData?.headline || "Member"}
              </div>
            </div>

            {/* Action Buttons */}
            <button
              onClick={() => {
                getProfile(userData.userName);
                setShowPopUp(false);
              }}
              className="w-full h-[42px] rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg"
            >
              View Profile
            </button>

            <hr className="w-full border-gray-200 my-1" />

            {/* Navigation Items */}
            <div
              onClick={() => {
                navigate("/network");
                setShowPopUp(false);
              }}
              className="flex items-center justify-start text-gray-700 w-full gap-3 px-3 py-2.5 rounded-xl hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-all duration-200 group"
            >
              <FaUserGroup className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <div className="font-medium">My Networks</div>
            </div>

            <button
              onClick={handleSignOut}
              className="w-full h-[42px] rounded-full bg-red-50 text-red-600 font-semibold border-2 border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200"
            >
              Sign Out
            </button>
          </div>
        )}

        {/* Navigation Icons */}
        <div
          onClick={() => navigate("/")}
          className="hidden lg:flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 cursor-pointer transition-all duration-200 px-3 py-1 rounded-lg hover:bg-blue-50 group"
        >
          <MdHome className="w-[22px] h-[22px] group-hover:scale-110 transition-transform" />
          <div className="text-xs font-medium mt-0.5">Home</div>
        </div>

        <div
          onClick={() => navigate("/network")}
          className="hidden md:flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 cursor-pointer transition-all duration-200 px-3 py-1 rounded-lg hover:bg-blue-50 group"
        >
          <FaUserGroup className="w-[20px] h-[20px] group-hover:scale-110 transition-transform" />
          <div className="text-xs font-medium mt-0.5">My Networks</div>
        </div>

        <div
          onClick={() => navigate("/notification")}
          className="flex flex-col items-center justify-center text-gray-500 hover:text-blue-600 cursor-pointer transition-all duration-200 px-3 py-1 rounded-lg hover:bg-blue-50 group relative"
        >
          <IoNotifications className="w-[20px] h-[20px] group-hover:scale-110 transition-transform" />
          <div className="text-xs font-medium mt-0.5 hidden md:block">Notification</div>
          {/* Notification Badge - Optional */}
          {/* <span className="absolute top-0 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> */}
        </div>

        {/* Profile Avatar */}
        <div
          onClick={() => setShowPopUp(!showPopUp)}
          className={`cursor-pointer w-[44px] h-[44px] overflow-hidden rounded-full border-2 transition-all duration-200 ${
            showPopUp ? 'border-blue-500 shadow-lg' : 'border-transparent hover:border-blue-300'
          }`}
        >
          <img
            src={userData.profileImage || dp}
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Nav;