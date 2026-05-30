const {Schema, default: mongoose} = require("mongoose")

const postSchema = new Schema({
    author:{
        type:Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    description:{
        type:String,
        default:""
    },
    image:{
        type:String
    },
    // multiple users can comments and likes
    like:[
        {
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    comment:[
        {
            content:{
                type:String
            },
            user:{
                type:Schema.Types.ObjectId,
                ref:"User"
            }
            
        }
    ]
},{
    timestamps:true
})

const Post = new mongoose.model("Post",postSchema)

module.exports = Post