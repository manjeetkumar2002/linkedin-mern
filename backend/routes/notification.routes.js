const express = require("express")
const isAuth = require("../middlewares/isAuth")
const { getNotifications, deleteNotification, clearAllNotification } = require("../controllers/notification.controllers")

const notificationRouter = express.Router()

notificationRouter.get("/get",isAuth,getNotifications)
notificationRouter.delete("/deleteone/:id",isAuth,deleteNotification)
notificationRouter.delete("/",isAuth,clearAllNotification)

module.exports = notificationRouter