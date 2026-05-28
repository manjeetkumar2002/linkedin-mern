const express = require("express")
const createPost = require("../controllers/post.controllers.js")
const isAuth = require("../middlewares/isAuth")
const upload = require("../middlewares/multer")

const postRouter = express.Router()


postRouter.post("/create",isAuth,upload.single("image"),createPost)

module.exports = postRouter