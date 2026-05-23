import {React,useContext,useState} from 'react'
import logo from "../assets/logo.svg"
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import {useNavigate} from "react-router-dom"
import {userDataContext} from "../context/UserContext.jsx"
import { authDataContext } from '../context/AuthContext.jsx';
import axios from "axios"
const Login = () => {
     const {userData,setUserData} = useContext(userDataContext)
    const [showPass,setShowPass] = useState(false)
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [loading,setLoading] = useState(false)
    const {serverUrl} = useContext(authDataContext)
    console.log(serverUrl)
    const handleSignIn = async (e) =>{
        console.log("submit called")
        e.preventDefault()
        setLoading(true)
        try {
            const result = await axios.post(serverUrl+"/api/auth/login",{
                email,password
            },{withCredentials:true})

            console.log(result)
            setUserData(result.data)
            setLoading(false)
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
        <form onSubmit={handleSignIn} className=' sm:border rounded-xl sm:border-gray-200 sm:max-w-[35%] w-full  p-[20px]'>
            <h1 className='text-2xl font-bold mb-[40px]'>Sign In</h1>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='email' className='mb-3 text-black placeholder:font-normal focus:outline-blue-400  placeholder:text-black border p-2 rounded w-full'/>
            <div className='relative'>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type={showPass?"text":"password"} placeholder='password' className='mb-3 placeholder:font-normal focus:outline-blue-400  text-black placeholder:text-black border p-2 rounded w-full'/>
                <IoMdEye onClick={()=>setShowPass(!showPass)}  className={`${showPass? "hidden":""} absolute cursor-pointer right-[20px] top-[12px] text-xl text-[#0c74db]`} />
                <IoMdEyeOff  onClick={()=>setShowPass(!showPass)} className={`${showPass? "":"hidden"} absolute cursor-pointer right-[20px] top-[12px] text-xl text-[#0c74db]`} />
            </div>
            <button type='submit' disabled={loading} className="bg-[#0c74db] cursor-pointer w-full text-white font-semibold py-2 px-4 rounded-xl mt-2">
                {loading?"Loading...":"Sign In"}
            </button>
            <p onClick={()=>navigate("/signup")} className='mt-4 text-center cursor-pointer'>want to create a new account? <span className='text-[#0c74db]'>Sign Up</span></p>
        </form>
    </div>
  )
}

export default Login