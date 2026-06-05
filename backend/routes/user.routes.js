const express = require("express")
const {getCurrentUser, getProfile,search,updateProfile,getSuggestedUser} = require("../controllers/user.controllers.js")
const isAuth = require("../middlewares/isAuth.js")
const upload = require("../middlewares/multer.js")
const userRouter = express.Router()


userRouter.get("/currentuser",isAuth,getCurrentUser)
userRouter.put("/updateprofile",isAuth,upload.fields([
    {name:"profileImage",maxCount:1},
    {name:"coverImage",maxCount:1}
]),updateProfile)
userRouter.get("/profile/:userName",isAuth,getProfile)
userRouter.get("/search",isAuth,search)
userRouter.get("/suggestedusers",isAuth,getSuggestedUser)

module.exports = userRouter