const express = require("express")
const {createPost, getPost, like, comment} = require("../controllers/post.controllers.js")
const isAuth = require("../middlewares/isAuth.js")
const upload = require("../middlewares/multer.js")

const postRouter = express.Router()


postRouter.post("/create",isAuth,upload.single("image"),createPost)
postRouter.get("/getpost",isAuth,getPost)
postRouter.get("/like/:id",isAuth,like)
postRouter.post("/comment/:id",isAuth,comment)


module.exports = postRouter