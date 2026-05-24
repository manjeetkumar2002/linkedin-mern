const {Schema, default: mongoose} = require("mongoose")

const userSchema = new Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    userName:{
        type:String,
        unique:true,
        require:true
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    profileImage:{
        type:String,
        default:""
    },
    coverImage:{
        type:String,
        default:""
    },
    headline:{
        type:String,
        default:""
    },
    skills:[{type:String}],
    education:[
        {
            college:{type:String},
            degree:{type:String},
            fieldOfStudy:{type:String}
        }
    ],
    location:{
        type:String,
        default:"India"
    },
    gender:{
        type:String,
        enum:["male","female","other"]
    },
    experience:[
        {
            title:{type:String},
            company:{type:String},
            description:{type:String}
        }
    ],
    connections:[
        {
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    ]
},{
    timestamps:true
})

const User = new mongoose.model("User",userSchema)

module.exports = User