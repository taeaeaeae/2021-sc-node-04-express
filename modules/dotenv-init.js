module.exports = () => {
    const path = require("path");
    const dotenv = require("dotenv");

    let file = ".env";
    if(process.env.NODE_ENV === 'test') file = ".env.test";
    if(process.env.NODE_ENV === 'production') file = ".env.production";

    dotenv.config({
        path: path.join(__dirname, "../", file)
    });
}