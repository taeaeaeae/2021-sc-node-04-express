const path = require("path");
const fs = require("fs-extra");

const filePath = (name) => {
  let thumbName = path.basename(name, path.extname(name)) + ".jpg";
  const virtualPath = path.join("/uploads/", name.split("_")[0], name);
  const thumbPath = path.join("/uploads/", name.split("_")[0], "thumb", thumbName);
  const absolutePath = path.join(__dirname, "../storages", name.split("_")[0], name);
  const thumbAbsolutePath = path.join(
    __dirname,
    "../storages",
    name.split("_")[0],
    "thumb",
    thumbName
  );
  return { absolutePath, virtualPath, thumbPath, thumbAbsolutePath };
};

const deleteFile = async (files) => {
  if (typeof files === "string") {
    let { absolutePath, thumbAbsolutePath } = filePath(files);
    await fs.remove(absolutePath);
    await fs.remove(thumbAbsolutePath);
  } else if (Array.isArray(files)) {
    for (let v of files) {
      let { absolutePath, thumbAbsolutePath } = filePath(v.saveName);
      await fs.remove(absolutePath);
      await fs.remove(thumbAbsolutePath);
      console.log(absolutePath, thumbAbsolutePath);
    }
  } else {
    throw new Error("처리할수 없는 형식입니다.");
  }
};

module.exports = { filePath, deleteFile };