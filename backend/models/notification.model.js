const {Schema, default: mongoose} = require("mongoose")

const notificationSchema = new Schema({
    receiver:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    // type of the notification (connection accept,like,comment)
    // we send a notification when someone like ,comment and accept connection
    type:{
        type:String,
        enum:["like","comment","connectionAccepted"]
    },
    // sender
    relatedUser:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    // post you like and comment
    relatedPost:{
        type:Schema.Types.ObjectId,
        ref:"Post"
    },

},{timestamps:true})


const Notification = new mongoose.model("Notification",notificationSchema)

module.exports = Notification