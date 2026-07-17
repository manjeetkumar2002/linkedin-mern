import React from 'react'
import {RxCross1} from "react-icons/rx"
import { useContext } from 'react'
import { userDataContext } from '../context/UserContext'
import dp from "../assets/default-profile.jpg"
import { FaPlus } from "react-icons/fa6";
import { CiCamera } from "react-icons/ci";
import { useState } from 'react'
import { useRef } from 'react'
import axios from 'axios'
import { authDataContext } from '../context/AuthContext.jsx'

const EditProfile = () => {
    let {serverUrl} = useContext(authDataContext)
    let {edit,setEdit,userData,setUserData} = useContext(userDataContext)
    let [firstName,setFirstName] = useState(userData.firstName || "")
    let [lastName,setLastName] = useState(userData.lastName || "")
    let [userName,setUserName] = useState(userData.userName || "")
    let [gender,setGender] = useState(userData.gender || "")
    let [location,setLocation] = useState(userData.location || "")
    let [headline,setHeadline] = useState(userData.headline || "")
    let [skills,setSkills] = useState(userData.skills || [])
    let [newSkills,setNewSkills] = useState("")
    let [education,setEducation] = useState(userData.education||[])
    let [newEducation,setNewEducation] = useState({
      college:"",
      degree:"",
      fieldOfStudy:""
    })
    let [experience,setExperience] = useState(userData.experience||[])
    let [newExperience,setNewExperience] = useState({
      title:"",
      company:"",
      description:""
    })
    const profileImage = useRef()
    const coverImage = useRef()

    const [frontendProfileImage,setFrontendProfileImage] = useState(
      userData.profileImage || dp
    )
    const [backendProfileImage,setBackendProfileImage] = useState(
      null
    )
    const [frontendCoverImage,setFrontendCoverImage] = useState(
      userData.coverImage || null
    )
    const [backendCoverImage,setBackendCoverImage] = useState(
      null
    )
    let [saving,setSaving] = useState(false)

    function addSkill() {
      if(newSkills && !skills.includes(newSkills)){
        setSkills([...skills,newSkills])
      }
      setNewSkills("")
    }
    function removeSkill(skill) {
        if(skills.includes(skill))
        setSkills([...skills.filter((s)=>s!=skill)])
    }

    function removeEducation(edu) {
      if(education.includes(edu)){
        setEducation([...education.filter((e)=>e!=edu)])
      }
    }

    function addEducation() {
      if(newEducation.college && newEducation.degree && newEducation.fieldOfStudy && !education.includes(newEducation)){
        setEducation([...education,newEducation])
      }
      setNewEducation({
      college:"",
      degree:"",
      fieldOfStudy:""
    })
    }
    function removeExperience(exp) {
      if(experience.includes(exp)){
        setExperience([...experience.filter((e)=>e!=exp)])
      }
    }
    function addExperience() {
      if(newExperience.title && newExperience.company && newExperience.description && !experience.includes(newExperience)){
        setExperience([...experience,newExperience])
      }
      setNewExperience({
      title:"",
      company:"",
      description:""
    })
    }

    function handleProfileImage(e){
      let file = e.target.files[0]
      setBackendProfileImage(file)
      setFrontendProfileImage(URL.createObjectURL(file))
    }

    function handleCoverImage(e){
      let file = e.target.files[0]
      setBackendCoverImage(file)
      setFrontendCoverImage(URL.createObjectURL(file))
    }

    const handleSaveProfile =async ()=>{
      setSaving(true)
      try {
        let formData = new FormData()
        formData.append("firstName",firstName)
        formData.append("lastName",lastName)
        formData.append("userName",userName)
        formData.append("headline",headline)
        formData.append("gender",gender)
        formData.append("location",location)
        formData.append("skills",JSON.stringify(skills))
        formData.append("education",JSON.stringify(education))
        formData.append("experience",JSON.stringify(experience))
        if(backendProfileImage){
          formData.append("profileImage",backendProfileImage)
        }
        if(backendCoverImage){
          formData.append("coverImage",backendCoverImage)
        }

        let result = await axios.put(serverUrl+"/api/user/updateprofile",formData,{
          withCredentials:true
        })
        setUserData(result.data)
        setSaving(false)
        setEdit(false)
      } catch (error) {
        setSaving(false)
        console.log(error)
      }
      setSaving(false)
    }

    return (
    <div className='flex justify-center items-center z-[100] fixed inset-0'>
      {/* Hidden file inputs */}
      <input onChange={handleProfileImage} type="file" accept='image/*' hidden ref={profileImage}/>
      <input onChange={handleCoverImage} type="file" accept='image/*' hidden ref={coverImage}/>
      
      {/* Backdrop */}
      <div className='bg-black/60 backdrop-blur-sm h-full w-full absolute animate-fadeIn'></div>
      
      {/* Modal */}
      <div className='overflow-y-auto relative p-6 w-[92%] max-w-[540px] max-h-[90vh] bg-white rounded-2xl shadow-2xl animate-scaleIn'>
        {/* Close Button */}
        <button 
          onClick={()=>setEdit(false)} 
          className='absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 z-10'
        >
          <RxCross1 className='w-5 h-5 text-gray-600 hover:text-gray-800'/>
        </button>

        {/* Cover Image */}
        <div 
          onClick={()=>coverImage.current.click()} 
          className='relative mt-2 w-full h-[160px] bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl overflow-hidden cursor-pointer group'
        >
          {frontendCoverImage ? (
            <img src={frontendCoverImage} alt="cover" className='w-full h-full object-cover'/>
          ) : (
            <div className='w-full h-full bg-gradient-to-r from-blue-400 to-indigo-500'></div>
          )}
          <div className='absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
            <CiCamera className='w-8 h-8 text-white'/>
          </div>
        </div>

        {/* Profile Image */}
        <div className='relative'>
          <div 
            onClick={()=>profileImage.current.click()} 
            className='absolute -top-12 left-4 cursor-pointer group'
          >
            <div className='relative w-[88px] h-[88px] rounded-full border-4 border-white shadow-lg overflow-hidden'>
              <img 
                src={frontendProfileImage} 
                alt="profile" 
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                <FaPlus className='text-white text-xl'/>
              </div>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className='flex flex-col gap-4 mt-14'>
          {/* Basic Info */}
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <input 
              value={firstName} 
              onChange={(e)=>setFirstName(e.target.value)} 
              type="text" 
              placeholder="First Name" 
              className='w-full h-[48px] outline-none border-2 border-gray-200 rounded-xl px-4 py-2 text-[15px] text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200'
            />
            <input 
              value={lastName} 
              onChange={(e)=>setLastName(e.target.value)} 
              type="text" 
              placeholder="Last Name" 
              className='w-full h-[48px] outline-none border-2 border-gray-200 rounded-xl px-4 py-2 text-[15px] text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200'
            />
          </div>

          <input 
            value={userName} 
            onChange={(e)=>setUserName(e.target.value)} 
            type="text" 
            placeholder="Username" 
            className='w-full h-[48px] outline-none border-2 border-gray-200 rounded-xl px-4 py-2 text-[15px] text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200'
          />
          
          <input 
            value={headline} 
            onChange={(e)=>setHeadline(e.target.value)} 
            type="text" 
            placeholder="Headline" 
            className='w-full h-[48px] outline-none border-2 border-gray-200 rounded-xl px-4 py-2 text-[15px] text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200'
          />
          
          <input 
            value={location} 
            onChange={(e)=>setLocation(e.target.value)} 
            type="text" 
            placeholder="Location" 
            className='w-full h-[48px] outline-none border-2 border-gray-200 rounded-xl px-4 py-2 text-[15px] text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200'
          />
          
          <input 
            value={gender} 
            onChange={(e)=>setGender(e.target.value)} 
            type="text" 
            placeholder="Gender (male, female, other)" 
            className='w-full h-[48px] outline-none border-2 border-gray-200 rounded-xl px-4 py-2 text-[15px] text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200'
          />

          {/* Skills Section */}
          <div className='w-full p-4 border-2 border-gray-200 rounded-xl space-y-3'>
            <h3 className='text-[17px] font-bold text-gray-700'>Skills</h3>
            
            {skills.length > 0 && (
              <div className='flex flex-wrap gap-2'>
                {skills.map((skill,index) => (
                  <div 
                    key={index}
                    className='flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full border border-blue-200 text-sm font-medium'
                  >
                    <span>{skill}</span>
                    <RxCross1 
                      onClick={()=>removeSkill(skill)} 
                      className='w-3 h-3 cursor-pointer hover:text-red-500 transition-colors duration-200'
                    />
                  </div>
                ))}
              </div>
            )}
            
            <div className='flex gap-2'>
              <input 
                className='flex-1 h-[42px] outline-none border-2 border-gray-200 rounded-xl px-4 py-2 text-[14px] text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200' 
                type="text" 
                placeholder="Add new skill" 
                value={newSkills} 
                onChange={(e)=>setNewSkills(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
              <button 
                onClick={addSkill} 
                className='px-6 h-[42px] rounded-xl text-blue-600 font-semibold border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 whitespace-nowrap'
              >
                Add
              </button>
            </div>
          </div>

          {/* Education Section */}
          <div className='w-full p-4 border-2 border-gray-200 rounded-xl space-y-3'>
            <h3 className='text-[17px] font-bold text-gray-700'>Education</h3>
            
            {education.length > 0 && (
              <div className='space-y-2'>
                {education.map((edu,index) => (
                  <div 
                    key={index}
                    className='flex items-start justify-between p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-200 transition-colors duration-200'
                  >
                    <div className='space-y-0.5'>
                      <div className='font-semibold text-gray-800'>{edu.college}</div>
                      <div className='text-sm text-gray-600'>{edu.degree}</div>
                      <div className='text-sm text-gray-500'>{edu.fieldOfStudy}</div>
                    </div>
                    <RxCross1 
                      onClick={()=>removeEducation(edu)} 
                      className='w-4 h-4 cursor-pointer hover:text-red-500 transition-colors duration-200 flex-shrink-0 mt-1'
                    />
                  </div>
                ))}
              </div>
            )}
            
            <div className='space-y-3'>
              <input 
                className='w-full h-[42px] outline-none border-2 border-gray-200 rounded-xl px-4 py-2 text-[14px] text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200' 
                type="text" 
                placeholder="College" 
                value={newEducation.college} 
                onChange={(e)=>setNewEducation({...newEducation,college:e.target.value})}
              />
              <input 
                className='w-full h-[42px] outline-none border-2 border-gray-200 rounded-xl px-4 py-2 text-[14px] text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200' 
                type="text" 
                placeholder="Degree" 
                value={newEducation.degree} 
                onChange={(e)=>setNewEducation({...newEducation,degree:e.target.value})}
              />
              <input 
                className='w-full h-[42px] outline-none border-2 border-gray-200 rounded-xl px-4 py-2 text-[14px] text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200' 
                type="text" 
                placeholder="Field of Study" 
                value={newEducation.fieldOfStudy} 
                onChange={(e)=>setNewEducation({...newEducation,fieldOfStudy:e.target.value})}
              />
              <button 
                onClick={addEducation} 
                className='w-full h-[42px] rounded-xl text-blue-600 font-semibold border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200'
              >
                Add Education
              </button>
            </div>
          </div>

          {/* Experience Section */}
          <div className='w-full p-4 border-2 border-gray-200 rounded-xl space-y-3'>
            <h3 className='text-[17px] font-bold text-gray-700'>Experience</h3>
            
            {experience.length > 0 && (
              <div className='space-y-2'>
                {experience.map((exp,index) => (
                  <div 
                    key={index}
                    className='flex items-start justify-between p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-blue-200 transition-colors duration-200'
                  >
                    <div className='space-y-0.5'>
                      <div className='font-semibold text-gray-800'>{exp.title}</div>
                      <div className='text-sm text-gray-600'>{exp.company}</div>
                      {exp.description && (
                        <div className='text-sm text-gray-500'>{exp.description}</div>
                      )}
                    </div>
                    <RxCross1 
                      onClick={()=>removeExperience(exp)} 
                      className='w-4 h-4 cursor-pointer hover:text-red-500 transition-colors duration-200 flex-shrink-0 mt-1'
                    />
                  </div>
                ))}
              </div>
            )}
            
            <div className='space-y-3'>
              <input 
                className='w-full h-[42px] outline-none border-2 border-gray-200 rounded-xl px-4 py-2 text-[14px] text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200' 
                type="text" 
                placeholder="Title" 
                value={newExperience.title} 
                onChange={(e)=>setNewExperience({...newExperience,title:e.target.value})}
              />
              <input 
                className='w-full h-[42px] outline-none border-2 border-gray-200 rounded-xl px-4 py-2 text-[14px] text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200' 
                type="text" 
                placeholder="Company" 
                value={newExperience.company} 
                onChange={(e)=>setNewExperience({...newExperience,company:e.target.value})}
              />
              <input 
                className='w-full h-[42px] outline-none border-2 border-gray-200 rounded-xl px-4 py-2 text-[14px] text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200' 
                type="text" 
                placeholder="Description" 
                value={newExperience.description} 
                onChange={(e)=>setNewExperience({...newExperience,description:e.target.value})}
              />
              <button 
                onClick={addExperience} 
                className='w-full h-[42px] rounded-xl text-blue-600 font-semibold border-2 border-blue-200 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200'
              >
                Add Experience
              </button>
            </div>
          </div>

          {/* Save Button */}
          <button 
            disabled={saving} 
            onClick={handleSaveProfile} 
            className="w-full h-[48px] bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 mt-2"
          >
            {saving ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              "Save Profile"
            )}
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { 
            opacity: 0; 
            transform: scale(0.9) translateY(20px);
          }
          to { 
            opacity: 1; 
            transform: scale(1) translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default EditProfile