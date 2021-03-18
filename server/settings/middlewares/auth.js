const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const auth = async (req, res, next) => {
    const token = await req.header("Auth-Token");

    if (!token) {
        return res.status(401).json({ errors: [{ msg: "No token, access denied!" }] })
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.user;

        next();
    } catch (error) {
        res.status(401).json({ errors: [{ msg: "Invalid token, access denied!" }] });
    }
}

module.exports = auth;
