const {Schema, default: mongoose} = require("mongoose")
const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // createdAt and updatedAt for each comment
  }
);
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
        commentSchema
    ]
},{
    timestamps:true
})

const Post = new mongoose.model("Post",postSchema)

module.exports = Post