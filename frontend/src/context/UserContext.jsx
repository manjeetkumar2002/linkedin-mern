import { createContext, useContext, useEffect, useState } from "react"
import {authDataContext} from "./AuthContext"
import axios from "axios"

export const userDataContext = createContext()
const UserContext = ({children}) =>{
    const {serverUrl} = useContext(authDataContext)
    const [userData,setUserData] = useState(null)
    let [edit,setEdit] = useState(false)
    let [postData,setPostData] = useState(null)
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
            console.log("result :",result)
            setPostData(result.data)
        }
        catch(error){
            setPostData(null)
            console.log(error)
        }
    }
    useEffect(()=>{
        getCurrentUser()
        getPost()
    },[])
    const value = {
        userData,setUserData,edit,setEdit,postData,setPostData,getPost
    }
    return (
            <userDataContext.Provider value={value}>
            {children}
            </userDataContext.Provider>
    )
}

export default UserContext