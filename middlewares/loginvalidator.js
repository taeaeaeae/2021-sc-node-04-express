const createError = require("http-errors");
const validator = require("validator");

module.exports = async (req, res, next) => {
  try {
    let { userid, userpw } = req.body;
    let options = { min: 6, max: 24 };
    let validUserid = validator.isLength(userid.trim(), options);
    let validUserpw = validator.isLength(userpw.trim(), options);
    if (validUserid && validUserpw) {
      next();
    } else {
      next(createError(400));
    }
  } catch (err) {
    next(createError(err));
  }
};