const { validationResult } = require("express-validator");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models")

dotenv.config();

const loginUser = async(req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });

        if(user && (await bcrypt.compare(password, user.password))) {

            const payload = {
                user: {
                    id: user.id
                }
            }

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 36000 });

            res.json({ token });
        } else {
            return res.status(400).json({ errors: [{ msg: "400: Invalid credentials!" }] })
        }
    } catch (error) {
        res.status(500).json({ errors: [{ msg: "500: Server error!" }] });
    }
}

const userDetails = async(req,res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ errors: [{ msg: "400: Inavlid credentials" }] });
    }
}

module.exports = { userDetails, loginUser };