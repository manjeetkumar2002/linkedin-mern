const express = require("express")
const {getCurrentUser} = require("../controllers/user.controllers.js")
const {updateProfile} = require("../controllers/user.controllers.js")
const isAuth = require("../middlewares/isAuth.js")
const upload = require("../middlewares/multer.js")
const userRouter = express.Router()


userRouter.get("/currentuser",isAuth,getCurrentUser)
userRouter.put("/updateprofile",isAuth,upload.fields([
    {name:"profileImage",maxCount:1},
    {name:"coverImage",maxCount:1}
]),updateProfile)

module.exports = userRouter