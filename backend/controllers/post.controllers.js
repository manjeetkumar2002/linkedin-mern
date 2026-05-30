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

const getPost = async(req,res)=>{
    try{
        const post = await Post.find()
        .populate("author","firstName lastName profileImage headline")
        .populate("comment.user","firstName lastName profileImage headline")
        .sort({createdAt:-1})
        return res.status(200).json(post)
    }
    catch(error){
        return res.status(500).json({message:"getPost Error"})
    }
}

const like = async (req,res)=>{
    try {
        const postId = req.params.id
        const userId = req.userId
        let post = await Post.findById(postId)
        if(!post){
            return res.status(400).json({message:"post not found!"})
        }
        // user can only like once
        if(post.like.includes(userId)){
            post.like = post.like.filter((id)=>id!=userId)
        }
        else{
            post.like.push(userId)
        }
        await post.save()
        return res.status(200).json(post)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"like error ",error})
    }
}

const comment = async (req,res)=>{
    try {
        const postId = req.params.id
        const userId = req.userId
        const {content} = req.body
        let post = await Post.findByIdAndUpdate(postId,{
            $push:{comment:{content,user:userId}}
        },{new:true})
        .populate("comment.user","firstName lastName profileImage headline")
        return res.status(200).json(post)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"comment error ",error})
    }
}

module.exports = {createPost,getPost,like,comment}