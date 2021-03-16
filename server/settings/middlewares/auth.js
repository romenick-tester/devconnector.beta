const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const auth = (req, res, next) => {
    const token = req.header("auth-token");

    if (!token) {
        return res.status(401).json({ errors: [{ msg: "No token, access denied!" }] })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.user;

        next();
    } catch (error) {
        res.status(401).json({ errors: [{ msg: "Invalid token, access denied!" }] });
    }
}

module.exports = auth;
