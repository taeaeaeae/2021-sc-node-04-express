const { alert } = require("../modules/util");

module.exports.isUser = (req, res, next) => {
  if (req.session && req.session.user) next();
  else res.send(alert("로그인 후 이용하세요.", "/"));
};

module.exports.isGuest = (req, res, next) => {
  if (req.session && req.session.user) res.send(alert("회원은 이용하실 수 없습니다.", "/"));
  else  next();
};