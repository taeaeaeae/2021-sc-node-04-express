const multer = require("multer");
const path = require("path");
const fs = require("fs-extra");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid"); // ES6 -> import { v4 as uuidv4 } from 'uuid';

const allowImg = ["jpg", "jpeg", "png", "gif"];
const allowDoc = ["txt", "pdf", "xls", "xlsx", "ppt", "pptx", "doc", "docx", "hwp"];
const allowMovie = ["wmv", "mp3", "mp4", "mov"];
const allowZip = ["zip", "alz"];
const allowFile = [...allowImg, ...allowDoc, ...allowZip, ...allowMovie];

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const folder = path.join(__dirname, "../storages", moment().format("YYYYMMDDHH"));
      await fs.ensureDir(folder);
      cb(null, folder);
    } catch (err) {
      cb(err);
    }
  },
  filename: (req, file, cb) => {
    try {
      const folder = moment().format("YYYYMMDDHH");
      const ext = path.extname(file.originalname).toLowerCase(); // jpg(x) .jpg(o)
      const filename = folder + "_" + uuidv4() + ext;
      cb(null, filename);
    } catch (err) {
      cb(err);
    }
  },
});

const limits = { fileSize: 1024000 * 5, files: 4, fields: 8, parts: 8 };

const fileFilter = (req, file, cb) => {
  try {
    let ext = path.extname(file.originalname).substr(1).toLowerCase();
    let type = file.fieldname === "uploadImg" ? "I" : "F";
    if (type === "I" && allowImg.includes(ext)) cb(null, true);
    else if (type === "F" && allowFile.includes(ext)) cb(null, true);
    else cb(new Error("업로드 할 수 없는 파일입니다."));
  } catch (err) {
    cb(err);
  }
};

module.exports = multer({ storage, limits, fileFilter });