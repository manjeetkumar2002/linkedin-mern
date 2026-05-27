// multer function to store the image into public folder

const multer = require("multer")


let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})
const upload = multer({storage})


module.exports = upload