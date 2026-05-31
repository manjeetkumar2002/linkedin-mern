const {Schema, default: mongoose} = require("mongoose")

const connectionSchema = new Schema({
    sender:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    receiver:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending"
    }
},{
    timestamps:true
})

const Connection = new mongoose.model("Connection",connectionSchema) 

module.exports = Connection