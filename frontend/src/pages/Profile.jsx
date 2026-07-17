import React, { useState } from "react";
import Nav from "../components/Nav";
import { FaPlus } from "react-icons/fa6";
import { CiCamera } from "react-icons/ci";
import { HiPencil } from "react-icons/hi2";
import dp from "../assets/default-profile.jpg";
import EditProfile from "../components/EditProfile";
import { useContext } from "react";
import { userDataContext } from "../context/UserContext";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import Post from "../components/Post.jsx";
import { useEffect } from "react";
import ConnectionButton from "../components/ConnectionButton.jsx";

const Profile = () => {
  let { userData, setUserData, edit, setEdit, profileData, setProfileData } = useContext(userDataContext);
  let { serverUrl } = useContext(authDataContext);
  let { postData, setPostData } = useContext(userDataContext);
  let [profilePost, setProfilePost] = useState([]);

  useEffect(() => {
    setProfilePost(postData.filter((post) => post.author._id == profileData._id));
  }, [profileData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-8">
      <Nav />
      
      {edit && <EditProfile />}
      
      <div className="w-full max-w-4xl mx-auto px-3 lg:px-4 mt-4 space-y-4">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative">
          {/* Cover Image */}
          <div
            onClick={() => setEdit(!edit)}
            className="w-full h-[200px] bg-gradient-to-r from-blue-400 to-purple-500 relative overflow-hidden cursor-pointer group"
          >
            {profileData.coverImage ? (
              <img
                src={profileData.coverImage}
                alt="background-image"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-blue-400 to-indigo-500"></div>
            )}
            {profileData._id == userData._id && (
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <CiCamera className="w-8 h-8 text-white" />
              </div>
            )}
          </div>

          {/* Profile Image */}
          <div className="relative px-6 pb-6">
            <div
              onClick={() => setEdit(!edit)}
              className={`absolute -top-12 left-6 ${profileData._id == userData._id ? 'cursor-pointer group' : ''}`}
            >
              <div className="relative w-[96px] h-[96px] rounded-full border-4 border-white shadow-lg overflow-hidden">
                <img
                  src={profileData.profileImage || dp}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
                {profileData._id == userData._id && (
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <FaPlus className="text-white text-xl" />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-14">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-[24px] font-bold text-gray-800">
                    {`${profileData?.firstName} ${profileData?.lastName}`}
                  </div>
                  <div className="text-[15px] text-gray-600 font-medium">
                    {profileData?.headline || "No headline"}
                  </div>
                  <div className="text-[14px] text-gray-500">
                    {profileData?.location || "No location"}
                  </div>
                  <div className="text-[14px] text-blue-600 font-medium mt-1">
                    {profileData.connections?.length || 0} connections
                  </div>
                </div>

                {profileData._id == userData._id && (
                  <button
                    onClick={() => setEdit(!edit)}
                    className="min-w-[140px] h-[42px] rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 px-6"
                  >
                    Edit Profile
                    <HiPencil className="text-sm" />
                  </button>
                )}

                {profileData._id != userData._id && (
                  <div className="mt-2">
                    <ConnectionButton userId={profileData._id} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-bold text-gray-700">
              Posts
            </h2>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold">
              {profilePost.length}
            </span>
          </div>
        </div>

        {/* All Posts */}
        <div className="space-y-4">
          {profilePost.length > 0 ? (
            profilePost.map((post, index) => (
              <Post
                key={index}
                id={post._id}
                author={post.author}
                like={post.like}
                description={post.description}
                image={post.image}
                createdAt={post.createdAt}
              />
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="text-gray-400 text-6xl mb-4">📝</div>
              <h3 className="text-lg font-semibold text-gray-600">No posts yet</h3>
              <p className="text-gray-400 text-sm mt-1">
                {profileData._id == userData._id 
                  ? "Share your first post with your network!" 
                  : "This user hasn't posted anything yet."}
              </p>
            </div>
          )}
        </div>

        {/* Skills Section */}
        {profileData.skills?.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-[20px] font-bold text-gray-700 mb-4">
              Skills
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              {profileData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-100 hover:bg-blue-100 transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
              {profileData._id == userData._id && (
                <button
                  onClick={() => setEdit(!edit)}
                  className="px-5 py-2 rounded-full text-blue-600 border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 font-medium text-sm flex items-center gap-2"
                >
                  <FaPlus className="text-xs" />
                  Add Skill
                </button>
              )}
            </div>
          </div>
        )}

        {/* Education Section */}
        {profileData.education?.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-[20px] font-bold text-gray-700 mb-4">
              Education
            </h2>
            <div className="space-y-4">
              {profileData.education.map((edu, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors duration-200"
                >
                  <div className="font-semibold text-gray-800 text-lg">
                    {edu.college}
                  </div>
                  <div className="text-gray-600 mt-1">
                    <span className="font-medium">Degree:</span> {edu.degree}
                  </div>
                  <div className="text-gray-600">
                    <span className="font-medium">Field of Study:</span> {edu.fieldOfStudy}
                  </div>
                </div>
              ))}
              {profileData._id == userData._id && (
                <button
                  onClick={() => setEdit(!edit)}
                  className="mt-2 px-5 py-2 rounded-full text-blue-600 border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 font-medium text-sm flex items-center gap-2"
                >
                  <FaPlus className="text-xs" />
                  Add Education
                </button>
              )}
            </div>
          </div>
        )}

        {/* Experience Section */}
        {profileData.experience?.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-[20px] font-bold text-gray-700 mb-4">
              Experience
            </h2>
            <div className="space-y-4">
              {profileData.experience.map((exp, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors duration-200"
                >
                  <div className="font-semibold text-gray-800 text-lg">
                    {exp.title}
                  </div>
                  <div className="text-gray-600 mt-1">
                    <span className="font-medium">Company:</span> {exp.company}
                  </div>
                  {exp.description && (
                    <div className="text-gray-600 mt-1">
                      <span className="font-medium">Description:</span> {exp.description}
                    </div>
                  )}
                </div>
              ))}
              {profileData._id == userData._id && (
                <button
                  onClick={() => setEdit(!edit)}
                  className="mt-2 px-5 py-2 rounded-full text-blue-600 border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 font-medium text-sm flex items-center gap-2"
                >
                  <FaPlus className="text-xs" />
                  Add Experience
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Profile;