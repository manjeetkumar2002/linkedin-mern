const User = require("../models/user.model")
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

module.exports = getCurrentUser