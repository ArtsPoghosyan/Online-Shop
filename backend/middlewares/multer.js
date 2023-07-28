const multer = require("multer");
const path = require("path");

const Storage = multer.diskStorage({
    destination: function(req, file, func){
        return func(null, "../images/product")
    },
    filename: function(req, file, func){
        return func(null, `${Date.now()} - ${file.originalname}`);
    }
})

const upload = multer({Storage}).single("productImg");

module.exports = { upload }