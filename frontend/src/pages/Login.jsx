import {React,useState} from 'react'
import logo from "../assets/logo.svg"
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import {useNavigate} from "react-router-dom"
const Login = () => {
    const [showPass,setShowPass] = useState(false)
    const navigate = useNavigate()
  return (
    <div className='w-full h-screen flex flex-col justify-start items-center'>
        <div className='p-[10px] lg:p-[25px] w-full'>
            <img className='w-[300px] h-[30px]' src={logo} alt="logo" />
        </div>
        <form action="" className=' sm:border rounded-xl sm:border-gray-200 sm:max-w-[35%] w-full  p-[20px]'>
            <h1 className='text-2xl font-bold mb-[40px]'>Login</h1>
            <input type="email" placeholder='email' className='mb-3 text-black placeholder:font-normal focus:outline-blue-400  placeholder:text-black border p-2 rounded w-full'/>
            <div className='relative'>
            <input type={showPass?"text":"password"} placeholder='password' className='mb-3 placeholder:font-normal focus:outline-blue-400  text-black placeholder:text-black border p-2 rounded w-full'/>
                <IoMdEye onClick={()=>setShowPass(!showPass)}  className={`${showPass? "hidden":""} absolute cursor-pointer right-[20px] top-[12px] text-xl text-[#0c74db]`} />
                <IoMdEyeOff  onClick={()=>setShowPass(!showPass)} className={`${showPass? "":"hidden"} absolute cursor-pointer right-[20px] top-[12px] text-xl text-[#0c74db]`} />
            </div>
            <button className="bg-[#0c74db] cursor-pointer w-full text-white font-semibold py-2 px-4 rounded-xl mt-2">
                Login 
            </button>
            <p onClick={()=>navigate("/signup")} className='mt-4 text-center cursor-pointer'>Don't have an account? <span className='text-[#0c74db]'>Sign Up</span></p>
        </form>
    </div>
  )
}

export default Login