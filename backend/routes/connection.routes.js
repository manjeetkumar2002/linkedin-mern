const express = require("express")
const isAuth = require("../middlewares/isAuth.js")
const { sendConnection, acceptConnection, getConnectionStatus, rejectConnection, removeConnection } = require("../controllers/connection.controllers.js")
const connectionRouter = express.Router()
//reciever id
connectionRouter.get("/send/:id",isAuth,sendConnection)
// connection id bejenge aur usko accepted mark kar denge
connectionRouter.get("/accept/:connectionId",isAuth,acceptConnection)
connectionRouter.get("/reject/:connectionId",isAuth,rejectConnection)
connectionRouter.get("/getstatus/:userId",isAuth,getConnectionStatus)
connectionRouter.get("/remove/:userId",isAuth,removeConnection)


module.exports = connectionRouter