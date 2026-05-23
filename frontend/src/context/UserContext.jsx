import { createContext, useContext, useEffect, useState } from "react"
import {authDataContext} from "./AuthContext"
import axios from "axios"

export const userDataContext = createContext()
const UserContext = ({children}) =>{
    const {serverUrl} = useContext(authDataContext)
    const [userData,setUserData] = useState(null)

    const getCurrentUser =async ()=>{
        try {
            const result = await axios.get(serverUrl+"/api/user/currentuser",{withCredentials:true})
            console.log("result :",result)
            setUserData(result.data)
        } catch (error) {
            setUserData(null)
        }
    }
    useEffect(()=>{
        getCurrentUser()
    },[])
    const value = {
        userData,setUserData
    }
    return (
            <userDataContext.Provider value={value}>
            {children}
            </userDataContext.Provider>
    )
}

export default UserContext