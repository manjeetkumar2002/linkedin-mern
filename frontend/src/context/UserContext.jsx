import { createContext, useContext, useEffect, useState } from "react"
import {authDataContext} from "./AuthContext"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const userDataContext = createContext()
const UserContext = ({children}) =>{
    const {serverUrl} = useContext(authDataContext)
    const [userData,setUserData] = useState(null)
    let [edit,setEdit] = useState(false)
    let [postData,setPostData] = useState(null)
    const [profileData,setProfileData] = useState([])
    let navigate = useNavigate()
    const getCurrentUser =async ()=>{
        try {
            const result = await axios.get(serverUrl+"/api/user/currentuser",{withCredentials:true})
            setUserData(result.data)
        } catch (error) {
            setUserData(null)
        }
    }

    const getPost = async()=>{
        try{
            const result = await axios.get(serverUrl+"/api/post/getpost",{withCredentials:true})
            setPostData(result.data)
        }
        catch(error){
            setPostData(null)
            console.log(error)
        }
    }

    const getProfile = async(userName)=>{
        try {
            const result = await axios.get(serverUrl+`/api/user/profile/${userName}`,{withCredentials:true})
            setProfileData(result.data)
            navigate("/profile")
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getCurrentUser()
        getPost()
    },[])
    const value = {
        userData,setUserData,edit,setEdit,postData,setPostData,getPost,getProfile,profileData,setProfileData
    }
    return (
            <userDataContext.Provider value={value}>
            {children}
            </userDataContext.Provider>
    )
}

export default UserContext