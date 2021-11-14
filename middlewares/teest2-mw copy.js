module.exports = (type) => {
    return (req, res, next) => {
        req.user.name += " " + type;
        next();
    }
}