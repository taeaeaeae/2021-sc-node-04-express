const path = require("path")

const filePath = (name) => {
    let thumbname = path.basename(name, path.extname(name)) + ".jpg";
    const virtualPath = path.join("/uploads/", name.split("_")[0], name);
    const absolutePath = path.join(__dirname, "../storages", name.split("_")[0], name)
    const thumbPath = path.join("/uploads/", name.split("_")[0], "thumb", thumbname);
    return { absolutePath, virtualPath, thumbPath }
}

module.exports = { filePath };