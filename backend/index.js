const express = require("express")
require("dotenv").config()
const connectDB = require("./config/db.js")
const cors = require("cors")
const authRouter = require("./routes/auth.routes.js")
const PORT = process.env.PORT || 5000 
const app = express()
const cookieParser = require("cookie-parser")
app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())
app.use("/api/auth",authRouter)

app.listen(PORT,()=>{
    connectDB()
    console.log("Server listen at port : ",PORT)
})