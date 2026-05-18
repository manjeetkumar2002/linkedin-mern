const mongoose = require("mongoose")
const MONGODB_URL = process.env.MONGODB_URL

const connectDB =async ()=>{
    try {
        await mongoose.connect(MONGODB_URL)
    } catch (error) {
        console.log("DB Error")        
    }
}

module.exports = connectDB