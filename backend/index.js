const express = require("express")
require("dotenv").config()
const connectDB = require("./config/db.js")
const PORT = process.env.PORT || 5000 
const app = express()

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.listen(PORT,()=>{
    connectDB()
    console.log("Server listen at port : ",PORT)
})