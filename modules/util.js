const path = require("path");
const fs = require("fs-extra");

module.exports.alert = (msg, location = "/") => {
  return `
  <script>
    alert('${msg}');
    location.href = '${location}';
  </script>`;
};

module.exports.filePath = (name) => {
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

module.exports.deleteFile = (files) => {
  if (typeof files === "string") {
    let { absolutePath, thumbAbsolutePath } = filePath(files);
    // console.log(absolutePath, thumbAbsolutePath);
    fs.removeSync(absolutePath);
    fs.removeSync(thumbAbsolutePath);
    return true;
  } else if (Array.isArray(files)) {
    for (let v of files) {
      let { absolutePath, thumbAbsolutePath } = filePath(v.saveName);
      fs.removeSync(absolutePath);
      fs.removeSync(thumbAbsolutePath);
      return true;
    }
  } else {
    throw new Error("처리할수 없는 형식입니다.");
  }
};
