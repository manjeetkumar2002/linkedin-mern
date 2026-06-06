const Notification = require("../models/notification.model.js")
// getting all notification
const getNotifications = async(req,res)=>{
    try {
        const userId = req.userId

        const notification = await Notification.find({receiver:userId})
        .populate("relatedUser","firstName lastName profileImage")
        .populate("relatedPost","image description")

        return res.status(200).json(notification)
    } catch (error) {
        return res.status(500).json({message:"getNotification error",error})
    }
}
// removing a notification
const deleteNotification = async(req,res)=>{
    try {
        const {id} = req.params

        const notification = await Notification.findOneAndDelete({
            _id:id,
            receiver:req.userId
        })

        return res.status(200).json({message:"notification deleted successfully"})
    } catch (error) {
        return res.status(500).json({message:"delete notification error",error})
    }
}

const clearAllNotification = async(req,res)=>{
    try {

        const notification = await Notification.deleteMany({
            receiver:req.userId
        })

        return res.status(200).json({message:"notification deleted successfully"})
    } catch (error) {
        return res.status(500).json({message:"delete all notification error",error})
    }
}

module.exports = {getNotifications,deleteNotification,clearAllNotification}
