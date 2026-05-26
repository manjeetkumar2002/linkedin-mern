// multer function to store the image into public folder

import multer from "multer";

const upload = multer({storage})

let storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})


module.exports = upload