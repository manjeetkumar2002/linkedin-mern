const express = require("express")
require("dotenv").config()
const connectDB = require("./config/db.js")
const cors = require("cors")
const authRouter = require("./routes/auth.routes.js")
const PORT = process.env.PORT || 5000 
const cookieParser = require("cookie-parser")
const userRouter = require("./routes/user.routes.js")
const postRouter = require("./routes/post.routes.js")
const connectionRouter = require("./routes/connection.routes.js")
const http = require("http")
const { Server } = require("socket.io")
const app = express()
const server = http.createServer(app)
// socket.io
const { setIO } = require("./socket.js");
const {userSocketMap} = require("./socketStore.js")
const notificationRouter = require("./routes/notification.routes.js")
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174",
    credentials: true,
  },
});

setIO(io);

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5174",
    credentials: true
}))
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/post",postRouter)
app.use("/api/connection",connectionRouter)
app.use("/api/notification",notificationRouter)


io.on("connection",(socket)=>{
    console.log("user connected",socket.id)
    socket.on("register",(userId)=>{
        userSocketMap.set(userId,socket.id)
    })
    socket.on("disconnect",()=>{
        console.log("user disconnected",socket.id)
    })
})



server.listen(PORT,()=>{
    connectDB()
    console.log("Server listen at port : ",PORT)
})
