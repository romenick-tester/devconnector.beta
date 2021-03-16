require("dotenv").config();
const { validationResult } = require("express-validator");
const normalize = require("normalize-url");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../settings");

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
            return res.status(400).json({ errors: [{ msg: "Invalid credentials! 🚩" }] })
        }
    } catch (error) {
        res.status(500).json({ errors: [{ msg: "Server error 🚩" }] });
    }
}

//route:        POST api/users
//desc:         register user
//access:       public  
const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ errors: [{ msg: "User already exist! 🚩" }] });
        }

        const avatar = normalize(gravatar.url(email, {
            s: "200",
            r: "pg",
            d: "mm"
        }), { forceHttps: true });

        user = new User({
            name,
            email,
            avatar,
            password
        })

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 });

        if (!token) {
            return res.status(400).json({ errors: [{ msg: "Invalid credentials 🚩 " }] })
        }

        res.json({ token });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: [{ msg: "Server error 🚩" }] });
    }
}

module.exports = { loginUser, registerUser };