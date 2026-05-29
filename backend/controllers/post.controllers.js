const uploadOnCloudinary = require("../config/cloudinary.js")
const Post = require("../models/post.model.js")

const createPost = async(req,res)=>{
    try{
        let {description} = req.body
        let newPost;
        // multer middleware sotre the image into req.file
        if(req.file){
            // upload on Cloudinary
            let image = await uploadOnCloudinary(req.file.path)

            newPost = await Post.create({
                author:req.userId,
                description,
                image
            })
        }
        else{
            newPost = await Post.create({
                author:req.userId,
                description
            })
        }

        return res.status(200).json(newPost)
    }
    catch(error){
        return res.status(201).json("create post error ",error)
    }
}

module.exports = {createPost}