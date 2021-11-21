const path = require("path");
const fs = require("fs-extra");
const sharp = require("sharp");

module.exports = (fieldname) => {
     return (req, res, next) => {
         if (req.files[fieldname]){
            for (let file of req.files[fieldname]) {
                sharp(file.path)
                 .resize(128)
                 .jpeg({ mozjpeg: true })
                 .toFile("test.jpg")
                 .then((data) => console.log(data))
                 .catch(err => next(err))
            }
         }
         next();
     };
};