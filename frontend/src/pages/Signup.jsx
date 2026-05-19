import {React,useContext,useState} from 'react'
import logo from "../assets/logo.svg"
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { authDataContext } from '../context/authContext';
const Signup = () => {
    const [showPass,setShowPass] = useState(false)
    const navigate = useNavigate()
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")
    const [userName,setUserName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)
    const {servereUrl} = useContext(authDataContext)
    console.log(servereUrl)
    const handleSignUp = async (e) =>{
        console.log("submit called")
        e.preventDefault()
        setLoading(true)
        try {
            const result = await axios.post(servereUrl+"/api/auth/signup",{
                firstName,lastName,userName,email,password
            },{withCredentials:true})

            console.log(result)
            setLoading(false)
            setFirstName("")
            setLastName("")
            setUserName("")
            setEmail("")
            setPassword("")
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    return (
    <div className='w-full h-screen flex flex-col justify-start items-center'>
        <div className='p-[10px] lg:p-[25px] w-full'>
            <img className='w-[300px] h-[30px]' src={logo} alt="logo" />
        </div>
        <form onSubmit={handleSignUp} className=' sm:border rounded-xl sm:border-gray-200 sm:max-w-[35%] w-full  p-[20px]'>
            <h1 className='text-2xl font-bold mb-[40px]'>Sign Up</h1>
            <input onChange={(e)=>setFirstName(e.target.value)} value={firstName} type="text" placeholder='firstName' className='mb-3 text-black placeholder:font-normal focus:outline-blue-400  placeholder:text-black border p-2 rounded w-full'/>
            <input onChange={(e)=>setLastName(e.target.value)} value={lastName} type="text" placeholder='lastName' className='mb-3 text-black placeholder:font-normal focus:outline-blue-400  placeholder:text-black border p-2 rounded w-full'/>
            <input onChange={(e)=>setUserName(e.target.value)} value={userName} type="text" placeholder='userName' className='mb-3 text-black placeholder:font-normal focus:outline-blue-400  placeholder:text-black border p-2 rounded w-full'/>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='email' className='mb-3 text-black placeholder:font-normal focus:outline-blue-400  placeholder:text-black border p-2 rounded w-full'/>
            <div className='relative'>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type={showPass?"text":"password"} placeholder='password' className='mb-3 placeholder:font-normal focus:outline-blue-400  text-black placeholder:text-black border p-2 rounded w-full'/>
                <IoMdEye onClick={()=>setShowPass(!showPass)}  className={`${showPass? "hidden":""} absolute cursor-pointer right-[20px] top-[12px] text-xl text-[#0c74db]`} />
                <IoMdEyeOff  onClick={()=>setShowPass(!showPass)} className={`${showPass? "":"hidden"} absolute cursor-pointer right-[20px] top-[12px] text-xl text-[#0c74db]`} />
            </div>
            <button type='submit' disabled={loading} className="bg-[#0c74db] cursor-pointer w-full text-white font-semibold py-2 px-4 rounded-xl mt-2">
                {loading?"Loading...":"Sign Up"}
            </button>
            <p onClick={()=>navigate("/login")} className='mt-4 text-center cursor-pointer'>Already have an account? <span className='text-[#0c74db]'>Sign In</span></p>
        </form>
    </div>
  )
}

export default Signup