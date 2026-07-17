import React, { useRef, useState } from "react";
import Nav from "../components/Nav";
import dp from "../assets/default-profile.jpg";
import { FaPlus } from "react-icons/fa6";
import { CiCamera } from "react-icons/ci";
import { HiPencil } from "react-icons/hi2";
import { useContext } from "react";
import { userDataContext } from "../context/UserContext";
import EditProfile from "../components/EditProfile";
import { RxCross1 } from "react-icons/rx";
import { FaRegImage } from "react-icons/fa6";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import Post from "../components/Post";
import { useEffect } from "react";

const Home = () => {
  let { userData, edit, setEdit } = useContext(userDataContext);
  let [frontendImage, setFrontendImage] = useState("");
  let [backendImage, setBackendImage] = useState("");
  let [description, setDescription] = useState("");
  let image = useRef();
  let [uploadPost, setUploadPost] = useState(false);
  let { serverUrl } = useContext(authDataContext);
  let [posting, setPosting] = useState(false);
  let { postData, setPostData, getProfile, getPost } = useContext(userDataContext);
  let [suggestedUser, setSuggestedUser] = useState([]);

  function handleImage(e) {
    let file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  }

  async function handleUploadPost() {
    setPosting(true);
    try {
      let formData = new FormData();
      formData.append("description", description);
      if (backendImage) {
        formData.append("image", backendImage);
      }

      const result = await axios.post(
        serverUrl + "/api/post/create",
        formData,
        {
          withCredentials: true,
        }
      );
      setUploadPost(false);
      setDescription("");
      setFrontendImage("");
      setBackendImage("");
      setPosting(false);
      await getPost();
    } catch (error) {
      setPosting(false);
      console.log("post upload error :", error);
    }
  }

  async function handleSuggestedUsers() {
    try {
      const result = await axios.get(serverUrl + "/api/user/suggestedusers", {
        withCredentials: true,
      });
      setSuggestedUser(result.data);
    } catch (error) {
      console.log("suggested User error", error);
    }
  }

  useEffect(() => {
    handleSuggestedUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-8 relative flex flex-col items-center justify-start gap-6 lg:px-6 px-0">
      {edit && <EditProfile />}
      <Nav />

      <div className="w-full max-w-7xl flex lg:flex-row flex-col gap-4 items-start px-3 lg:px-0">
        {/* Left Sidebar - Profile Card */}
        <div className="lg:sticky lg:top-[88px] lg:w-[280px] w-full flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
            {/* Cover Image */}
            <div
              onClick={() => setEdit(!edit)}
              className="w-full h-[120px] bg-gradient-to-r from-blue-400 to-purple-500 relative overflow-hidden cursor-pointer group"
            >
              {userData.coverImage ? (
                <img src={userData.coverImage} alt="cover" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>
              )}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <CiCamera className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Profile Image */}
            <div className="relative px-4 pb-4">
              <div
                onClick={() => setEdit(!edit)}
                className="absolute -top-12 left-4 cursor-pointer group"
              >
                <div className="relative w-[88px] h-[88px] rounded-full border-4 border-white shadow-lg overflow-hidden">
                  <img
                    src={userData.profileImage || dp}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <FaPlus className="text-white text-xl" />
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <div className="text-[20px] font-bold text-gray-800 truncate">
                  {`${userData?.firstName} ${userData?.lastName}`}
                </div>
                <div className="text-[14px] text-gray-600 font-medium truncate">
                  {userData?.headline || "No headline"}
                </div>
                <div className="text-[13px] text-gray-500 truncate">
                  {userData?.location || "No location"}
                </div>

                <button
                  onClick={() => setEdit(!edit)}
                  className="mt-4 w-full h-[42px] rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  Edit Profile
                  <HiPencil className="text-sm" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Feed */}
        <div className="flex-1 w-full max-w-2xl mx-auto lg:mx-0">
          {/* Create Post Card */}
          <div className="bg-white rounded-2xl shadow-lg p-5 mb-4 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-4">
              <div className="w-[52px] h-[52px] rounded-full overflow-hidden border-2 border-gray-100 flex-shrink-0">
                <img
                  src={userData.profileImage || dp}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => setUploadPost(true)}
                className="flex-1 text-left px-5 py-3 rounded-full border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 text-gray-600 font-medium text-sm"
              >
                Start a post...
              </button>
            </div>
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {postData && postData.map((post, index) => (
              <Post
                id={post._id}
                author={post.author}
                description={post.description}
                image={post.image}
                like={post.like}
                comment={post.comment}
                createdAt={post.createdAt}
                key={index}
              />
            ))}
          </div>
        </div>

        {/* Right Sidebar - Suggested Users */}
        <div className="lg:sticky lg:top-[88px] lg:w-[280px] w-full flex-shrink-0 hidden lg:block">
          <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-[16px] font-bold text-gray-700 mb-4">
              Suggested Users
            </h2>
            {suggestedUser.length > 0 ? (
              <div className="space-y-3">
                {suggestedUser.map((su, index) => (
                  <div
                    onClick={() => getProfile(su.userName)}
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-xl cursor-pointer hover:bg-blue-50 transition-all duration-200 group"
                  >
                    <div className="w-[44px] h-[44px] rounded-full overflow-hidden border-2 border-gray-100 flex-shrink-0">
                      <img
                        src={su.profileImage || dp}
                        alt="profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[14px] font-semibold text-gray-800 truncate group-hover:text-blue-600 transition-colors">
                        {`${su?.firstName} ${su?.lastName}`}
                      </div>
                      <div className="text-[12px] text-gray-500 truncate">
                        {su.headline || "Member"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <div className="text-sm">No suggested users</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Post Upload Modal */}
      {uploadPost && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-fadeIn"
            onClick={() => setUploadPost(false)}
          ></div>
          
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-[540px] max-h-[90vh] bg-white rounded-2xl shadow-2xl z-[300] flex flex-col animate-scaleIn">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-800">Create Post</h3>
              <button
                onClick={() => setUploadPost(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <RxCross1 className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* User Info */}
            <div className="flex items-center gap-3 px-5 pt-4">
              <div className="w-[44px] h-[44px] rounded-full overflow-hidden border-2 border-gray-100">
                <img
                  src={userData.profileImage || dp}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="font-semibold text-gray-800">
                {`${userData?.firstName} ${userData?.lastName}`}
              </div>
            </div>

            {/* Text Area */}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`flex-1 px-5 py-3 outline-none resize-none text-[16px] text-gray-700 placeholder-gray-400 ${
                frontendImage ? "min-h-[120px]" : "min-h-[200px]"
              }`}
              placeholder="What do you want to talk about...?"
            ></textarea>

            {/* Image Preview */}
            {frontendImage && (
              <div className="px-5">
                <div className="relative rounded-xl overflow-hidden bg-gray-50 border-2 border-gray-100">
                  <img
                    className="w-full max-h-[300px] object-contain"
                    src={frontendImage}
                    alt="post"
                  />
                  <button
                    onClick={() => {
                      setFrontendImage("");
                      setBackendImage("");
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors duration-200"
                  >
                    <RxCross1 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="p-4 border-t border-gray-100 mt-2">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => image.current.click()}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-600"
                >
                  <FaRegImage className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium">Add Image</span>
                </button>

                <button
                  disabled={posting}
                  onClick={handleUploadPost}
                  className="px-8 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {posting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Posting...
                    </span>
                  ) : (
                    "Post"
                  )}
                </button>
              </div>
            </div>

            {/* Hidden File Input */}
            <input
              onChange={handleImage}
              type="file"
              accept="image/*"
              ref={image}
              hidden
            />
          </div>
        </>
      )}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.25s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Home;