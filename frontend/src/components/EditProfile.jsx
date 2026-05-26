import React from 'react'
import {RxCross1} from "react-icons/rx"
import { useContext } from 'react'
import { userDataContext } from '../context/UserContext'
import dp from "../assets/default-profile.jpg"
import { FaPlus } from "react-icons/fa6";
import { CiCamera } from "react-icons/ci";
import { useState } from 'react'
const EditProfile = () => {
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
    return (
    <div className='flex justify-center items-center z-[100] fixed w-full h-[100vh] top-0'>
        <div className=' bg-black opacity-[0.5] h-full w-full absolute'></div>
        <div className='overflow-auto  relative p-[10px] w-[90%] max-w-[500px] h-[600px] bg-white absolute shadow-lg rounded-lg'>
            <div><RxCross1 onClick={()=>setEdit(false)} className='w-[25px] h-[25px] font-bold top-[20px] right-[20px] text-gray-800 cursor-pointer absolute text-xl'/></div>
            <div className='relative mt-[40px] w-full h-[150px] bg-gray-500 rounded-lg'>
              <img src={null} alt="" className='w-full' />
              <CiCamera className='absolute top-[20px] right-[20px] w-[25px] h-[25px] text-white font-extrabold '/>
            </div>
            <div className='absolute top-[150px] left-[30px] w-[80px] h-[80px] overflow-hidden rounded-full'>
              <img src={dp} alt="profile" className='w-full h-full'/>
            </div>
            <div  className='cursor-pointer absolute top-[200px] left-[90px] rounded-full p-[1px] text-white bg-[#2dc0ff] text-xl font-extrabold'>
              <FaPlus  />
            </div>
            {/* form */}
            <div className='flex flex-col items-center justify-center gap-[20px] mt-[50px]'>
              <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} type="text" placeholder='firstName' className='w-full h-[50px] outline-none border-2 rounded-lg border-gray-600 px-[10px] py-[5px] text-[18px]' />
              <input value={lastName} onChange={(e)=>setLastName(e.target.value)} type="text" placeholder='lastName'  className='w-full h-[50px] outline-none border-2 rounded-lg border-gray-600 px-[10px] py-[5px] text-[18px]'/>
              <input value={userName} onChange={(e)=>setUserName(e.target.value)} type="text" placeholder='userName'  className='w-full h-[50px] outline-none border-2 rounded-lg border-gray-600 px-[10px] py-[5px] text-[18px]'/>
              <input value={headline} onChange={(e)=>setHeadline(e.target.value)} type="text" placeholder='headline'  className='w-full h-[50px] outline-none border-2 rounded-lg border-gray-600 px-[10px] py-[5px] text-[18px]'/>
              <input value={location} onChange={(e)=>setLocation(e.target.value)} type="text" placeholder='location'  className='w-full h-[50px] outline-none border-2 rounded-lg border-gray-600 px-[10px] py-[5px] text-[18px]'/>
              <input value={gender} onChange={(e)=>setGender(e.target.value)} type="text" placeholder='gender (male,female,other)' className='w-full h-[50px] outline-none border-2 rounded-lg border-gray-600 px-[10px] py-[5px] text-[18px]' />
              {/* skills input */}
              <div className='w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg'>
                <h1 className='text-[19px] font-semibold'>Skills</h1>
                {
                  skills && <div className='gap-[10px] flex flex-col'>
                    {skills.map((skill,index)=>
                      <div className='flex justify-between items-center rounded-lg p-[10px] w-full h-[40px] border-[1px] border-gray-600 bg-gray-200 ' key={index}>
                       <span>{skill}</span>
                        <RxCross1 onClick={()=>removeSkill(skill)} className='cursor-pointer w-[20px] h-[20px] font-bold  text-gray-800 cursor-pointer  text-xl'/>
                      </div>
                    )}
                  </div>
                }
                {/* input new Skills */}
                <div  className='flex flex-col gap-[10px] items-start'>
                    <input className='w-full h-[50px] outline-none border-2 rounded-lg border-gray-600 px-[10px] py-[5px] text-[16px]' type="text" placeholder='add new skill' value={newSkills} onChange={(e)=>setNewSkills(e.target.value)}/>
                    <button onClick={addSkill} className='w-[100%] h-[40px] rounded-full text-[#2dc0ff] border-[#2dc0ff] border-2'>Add</button>
                </div>
              </div>
              {/* Education input */}
              <div className='w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg'>
                <h1 className='text-[19px] font-semibold'>Education</h1>
                {
                  education && <div className='gap-[10px] flex flex-col'>
                    {education.map((edu,index)=>
                      <div className='flex justify-between items-center rounded-lg p-[10px] w-full  border-[1px] border-gray-600 bg-gray-200 ' key={index}>
                        <div>
                          <div>College :{edu.college}</div>
                          <div>Degree :{edu.degree}</div>
                          <div>Field Of Study :{edu.fieldOfStudy}</div>
                        </div>
                        <RxCross1 onClick={()=>removeEducation(edu)} className='cursor-pointer w-[20px] h-[20px] font-bold  text-gray-800 cursor-pointer  text-xl'/>
                      </div>
                    )}
                  </div>
                }
                {/* input new Education */}
                <div  className='flex flex-col gap-[10px] items-start'>
                    <input className='w-full h-[50px] outline-none border-2 rounded-lg border-gray-600 px-[10px] py-[5px] text-[16px]' type="text" placeholder='college' value={newEducation.college} onChange={(e)=>setNewEducation({...newEducation,college:e.target.value})}/>
                    <input className='w-full h-[50px] outline-none border-2 rounded-lg border-gray-600 px-[10px] py-[5px] text-[16px]' type="text" placeholder='degree' value={newEducation.degree} onChange={(e)=>setNewEducation({...newEducation,degree:e.target.value})}/>
                    <input className='w-full h-[50px] outline-none border-2 rounded-lg border-gray-600 px-[10px] py-[5px] text-[16px]' type="text" placeholder='field of study' value={newEducation.fieldOfStudy} onChange={(e)=>setNewEducation({...newEducation,fieldOfStudy:e.target.value})}/>
                    <button onClick={addEducation} className='w-[100%] h-[40px] rounded-full text-[#2dc0ff] border-[#2dc0ff] border-2'>Add</button>
                </div>
              </div>
              {/* Experience Input */}
              {/* Education input */}
              <div className='w-full p-[10px] border-2 border-gray-600 flex flex-col gap-[10px] rounded-lg'>
                <h1 className='text-[19px] font-semibold'>Experience</h1>
                {
                  experience && <div className='gap-[10px] flex flex-col'>
                    {experience.map((exp,index)=>
                      <div className='flex justify-between items-center rounded-lg p-[10px] w-full  border-[1px] border-gray-600 bg-gray-200 ' key={index}>
                        <div>
                          <div>Title :{exp.title}</div>
                          <div>Company :{exp.company}</div>
                          <div>Description :{exp.description}</div>
                        </div>
                        <RxCross1 onClick={()=>removeExperience(exp)} className='cursor-pointer w-[20px] h-[20px] font-bold  text-gray-800 cursor-pointer  text-xl'/>
                      </div>
                    )}
                  </div>
                }
                {/* input new Experience */}
                <div  className='flex flex-col gap-[10px] items-start'>
                    <input className='w-full h-[50px] outline-none border-2 rounded-lg border-gray-600 px-[10px] py-[5px] text-[16px]' type="text" placeholder='title' value={newExperience.title} onChange={(e)=>setNewExperience({...newExperience,title:e.target.value})}/>
                    <input className='w-full h-[50px] outline-none border-2 rounded-lg border-gray-600 px-[10px] py-[5px] text-[16px]' type="text" placeholder='co' value={newExperience.company} onChange={(e)=>setNewExperience({...newExperience,company:e.target.value})}/>
                    <input className='w-full h-[50px] outline-none border-2 rounded-lg border-gray-600 px-[10px] py-[5px] text-[16px]' type="text" placeholder='description' value={newExperience.description} onChange={(e)=>setNewExperience({...newExperience,description:e.target.value})}/>
                    <button onClick={addExperience} className='w-[100%] h-[40px] rounded-full text-[#2dc0ff] border-[#2dc0ff] border-2'>Add</button>
                </div>
            </div>
                <button className="bg-[#0c74db] cursor-pointer w-full text-white font-semibold py-2 px-4 rounded-xl mt-2">Save</button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile