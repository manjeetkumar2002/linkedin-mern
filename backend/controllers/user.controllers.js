const User = require("../models/user.model")
const uploadOnCloudinary = require("../config/cloudinary")
const getCurrentUser = async(req,res)=>{
    try {
        const userId = req.userId
        const user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({message:"User doesn't found"})
        }
        res.status(200).json(user)
    } catch (error) {
        console.log(error.message)
        return res.status(400).json({message:"getCurrentUser Error"})
    }
}

const updateProfile = async(req,res)=>{
    try {
        let {firstName,lastName,userName,headline,location,gender} = req.body
        let profileImage;
        let coverImage;
        let skills = req.body.skills?JSON.parse(req.body.skills):[]
        let education = req.body.education?JSON.parse(req.body.education):[]
        let experience = req.body.experience?JSON.parse(req.body.experience):[]
        console.log(req.files)
        if(req.files.profileImage){
            profileImage = await uploadOnCloudinary(req.files.profileImage[0].path)
        }
        if(req.files.coverImage){
            coverImage = await uploadOnCloudinary(req.files.coverImage[0].path)
        }
        console.log("profile :",profileImage)
        console.log("cover :",coverImage)
        let user = await User.findByIdAndUpdate(req.userId,{
            firstName,lastName,userName,headline,location,gender,skills,education,experience,
            profileImage,coverImage
        },{new:true}).select("-password")

        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"update Profile Error"})
    }
}

module.exports = {getCurrentUser,updateProfile}