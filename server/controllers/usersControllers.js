const { validationResult } = require("express-validator");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const registerUser = async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({ errors: [ { msg: "User already exist!" } ] });
        }

        const avatar = gravatar.url(email, {
            s: "200",
            r: "pg",
            d: "mm"
        })

        user = new User({
            name,
            email,
            avatar,
            password
        })

        const salt = await bcrypt.genSalt(10);
        
        user.password = await bcrypt.hash(password, salt);
    
        await user.save();
    
        // return jsonwebtoken
        res.send("user registered!");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
}

module.exports = { registerUser };
