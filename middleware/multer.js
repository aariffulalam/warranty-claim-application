const multer = require("multer");
const path  = require('path')

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./public")
    },
    filename: (req, file, cb)=>{
        const ext = path.extname(file.originalname)
        if (ext != ".jpg" && ext != ".png" && ext != ".jpeg" ){
            cb(new Error("file type not supported"))
            return
        }else{
            cb(null, Date.now()+"-"+file.originalname)
        }
    }
});

const upload =  multer({storage:fileStorageEngine});

module.exports = {upload}