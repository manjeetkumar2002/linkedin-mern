import { Routes ,Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { useContext } from "react"
import {userDataContext} from "./context/UserContext"
import Network from "./pages/Network"
function App() {
  const {userData} = useContext(userDataContext)
  console.log("userData :",userData)
  return (
    <>
      <Routes>
        <Route path="/" element={userData?<Home/>:<Navigate to="/login" />} />
        <Route path="/signup" element={userData?<Navigate to="/"/>:<Signup/>} />
        <Route path="/login" element={userData?<Navigate to="/"/>:<Login/>} />
        <Route path="/newtwork" element={userData?<Network/>:<Navigate to="/login" />} />
      </Routes>
    </>
  )
}

export default App
