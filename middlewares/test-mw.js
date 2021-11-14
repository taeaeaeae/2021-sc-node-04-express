module.exports = () => {
return (req, res, next) => {
    req.user = {};
    req.user.name = _name;
    next();
    };
};