const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const auth = async (req, res, next) => {
    try {
        const token = await req.header("auth-token");

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded && decoded.user;

        next();
    } catch (error) {
        console.error(error.message);
        res.status(401).json({ errors: [{ msg: "401: Invalid token, access denied!" }] });
    }
}

module.exports = auth;
