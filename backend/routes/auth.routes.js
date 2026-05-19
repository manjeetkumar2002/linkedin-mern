const express = require("express")
const { signUp, logout, login } = require("../controllers/auth.controllers")

const authRouter = express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/login",login)
authRouter.post("/logout",logout)

module.exports = authRouter