const express = require("express")
const getCurrentUser = require("../controllers/user.controllers.js")
const isAuth = require("../middlewares/isAuth.js")

const userRouter = express.Router()


userRouter.get("/currentuser",isAuth,getCurrentUser)

module.exports = userRouter