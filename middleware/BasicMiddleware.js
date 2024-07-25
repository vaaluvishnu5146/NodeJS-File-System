const jwt = require('jsonwebtoken');

function BasicMiddleware(req, res, next) {
    try {
        if (req.headers.authorization) {
            const token = jwt.verify(req.headers.authorization, "FILE_SYSTEM_SECRET_KEY");
            if (token) {
                next();
            }
        } else {
            return res.status(500).json({
                message: "Token is missing"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        })
    }
}

module.exports = {
    BasicMiddleware
};