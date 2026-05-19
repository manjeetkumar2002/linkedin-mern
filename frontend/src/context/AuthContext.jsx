import React, { createContext } from 'react'
export const authDataContext = createContext()

const servereUrl = "http://localhost:8000"
const value = {
    servereUrl 
}
const AuthContext = ({children}) => {
  return (
    <div>
        <authDataContext.Provider value={value}>
        {children}
        </authDataContext.Provider>
    </div>
  )
}

export default AuthContext
