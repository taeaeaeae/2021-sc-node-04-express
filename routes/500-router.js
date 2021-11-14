module.exports = (err, req, res, next) => {
  console.log(err.status);
  res.render("error/error", {
    status: err.status || 500,
    message: err.message,
    description: err.stack, // SQL에러
  });
};