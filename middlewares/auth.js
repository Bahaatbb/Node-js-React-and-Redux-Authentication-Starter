const jwt = require('jsonwebtoken');
const dotnev = require('dotenv').config();

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'];
    const error = new Error();
    error.status = 401;
    if (token) {
        try {
            const user = jwt.verify(token, process.env.JWTSECRET);
            req.user = user;
            return next();
        } catch (e) {
            error.message = "invalid/expired token";
            return next(error);
        }
    } else {
        error.message = "authorization required";
        return next(error);
    }
};