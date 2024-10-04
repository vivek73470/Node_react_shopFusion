const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send("Authentication token is required");
    }
    try {
        const decoded = jwt.verify(token, 'masai');
        if (decoded) {
            return next();
        } else {
            return res.status(401).send("Invalid Token");
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send("Token verification failed");
    }
};


module.exports = authenticate;