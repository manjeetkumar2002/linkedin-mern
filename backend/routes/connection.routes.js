const express = require("express")
const isAuth = require("../middlewares/isAuth.js")
const { sendConnection, acceptConnection, getConnectionStatus, rejectConnection, removeConnection, getUserConnections, getConnectionRequests } = require("../controllers/connection.controllers.js")
const connectionRouter = express.Router()
//reciever id
connectionRouter.post("/send/:id",isAuth,sendConnection)
// connection id bejenge aur usko accepted mark kar denge
connectionRouter.put("/accept/:connectionId",isAuth,acceptConnection)
connectionRouter.put("/reject/:connectionId",isAuth,rejectConnection)
connectionRouter.get("/getstatus/:userId",isAuth,getConnectionStatus)
connectionRouter.delete("/remove/:userId",isAuth,removeConnection)
connectionRouter.get("/requests",isAuth,getConnectionRequests)
connectionRouter.get("/",isAuth,getUserConnections)


module.exports = connectionRouter