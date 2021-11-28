const path = require("path");
const fs = require("fs-extra");

const filePath = (name) => {
  let thumbName = path.basename(name, path.extname(name)) + ".jpg";
  const virtualPath = path.join("/uploads/", name.split("_")[0], name);
  const thumbPath = path.join("/uploads/", name.split("_")[0], "thumb", thumbName);
  const absolutePath = path.join(__dirname, "../storages", name.split("_")[0], name);
  const thumbabsolutePath = path.join(__dirname, "../storages", name.split("_")[0], "thumb", thumbName);
  // console.log(absolutePath);
  // console.log(virtualPath);
  // console.log(thumbPath);
  return { absolutePath, virtualPath, thumbPath };
};

const deleteFile = async (files) => {
  try {
    if (typeof files === "string") {
      let { absolutePath, thumbAbsolutPath } = filePath(files);
      await fs.remove(absolutePath);
      await fs.remove(thumbAbsolutPath);
    } else if (Array.isArray(files)) {
      for (let v of files) {
        let { absolutePath, thumbAbsolutPath } = filePath(files.saveName);
        // console
        await fs.remove(absolutePath);
        await fs.remove(thumbAbsolutPath);
      }
    } else {
      throw new Error("처리할수 없는 형식입니다.");
    }
  } catch (err) {
    return err;
  }
};

module.exports = { filePath, deleteFile };