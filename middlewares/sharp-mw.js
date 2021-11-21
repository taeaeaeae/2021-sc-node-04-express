const path = require("path");
const fs = require("fs-extra");
const sharp = require("sharp");

module.exports = (fieldname) => {
  return async (req, res, next) => {
    if (req.files[fieldname]) {
      for (let file of req.files[fieldname]) {
        await fs.ensureDir(path.join(file.destination, "thumb"));
        let filename = path.basename(file.filename, path.extname(file.filename)) + ".jpg";
        let savePath = path.join(file.destination, "thumb", filename);
        sharp(file.path)
          .resize(128)
          .jpeg({ mozjpeg: true })
          .toFile(savePath)
          .then((data) => console.log(data))
          .catch((err) => next(err));
      }
    }
    next();
  };
};