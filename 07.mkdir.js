/* const path = require("path");
const fs = require("fs");
const fsp = require("fs/promises");

let filePath = path.join(__dirname, "./AAAA");
if (!fs.existsSync(filePath)) fsp.mkdir(filePath).then(r=> console.log(r)).catch(err=>console.log(err)); */

const path = require("path");
const fs = require("fs-extra");
let filePath = path.join(__dirname, "./AAAA");
fs.ensureDir(filePath)
  .then((r) => console.log(r))
  .catch((err) => console.log(err));