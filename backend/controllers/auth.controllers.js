const genToken = require("../config/token")
const User = require("../models/user.model")
const bcrypt = require("bcryptjs")

const signUp = async (req,res)=>{
    try {
        let {firstName,lastName,userName,email,password} = req.body
        let existEmail = await User.findOne({email:email})
        if(existEmail){
            return res.status(400).json({message:"email already exist !"})
        }
        let existUserName = await User.findOne({userName:userName})
        if(existUserName){
            return res.status(400).json({message:"username already exist !"})
        }
        if(password.length<8){
            return res.status(400).json({message:"password must be atleast 8 characters !"})
        }
        // hash the password
        const hassedPassword = await bcrypt.hash(password,10)
        const user = await User.create({firstName,lastName,userName,email,password:hassedPassword})
        // generate jwt token
        const token = await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000, // 7 days in milliseconds
            sameSite:"strict",
            secure:process.env.NODE_ENVIRONMENT === "production"
        })
        return res.status(201).json(user)

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message})
    }
}

const login = async (req,res)=>{
    try {
        let {email,password} = req.body
        let user = await User.findOne({email:email})
        if(!user){
            return res.status(400).json({message:"user does not exist !"})
        }
        
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"Incorrect password !"})
        }

        // generate jwt token
        const token = await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000, // 7 days in milliseconds
            sameSite:"strict",
            secure:process.env.NODE_ENVIRONMENT === "production"
        })
        return res.status(201).json(user)

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error})
    }
}

const logout = async (req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({message:"logout successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error})
    }
}

module.exports = {signUp,login,logout}