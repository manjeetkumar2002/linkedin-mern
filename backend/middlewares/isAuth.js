const jwt = require("jsonwebtoken")
const isAuth = async (req,res,next)=>{
  try {
    const {token} = req.cookies

    if(!token){
        return res.status(400).json({message:"user doesn't have token!"})
    }

    const verifyToken = await jwt.verify(token,process.env.JWT_SECRET)
    if(!verifyToken){
        return res.status(400).json({message:"user doesn't have a valid token!"})
    }
    req.userId = verifyToken.userId
    next()
  } catch (error) {
    res.status(500).json({message:"isAuth error"})
  }  
}

module.exports = isAuth