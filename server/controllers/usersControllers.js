const { validationResult } = require("express-validator");

const registerUser = (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array().map((error) => error.msg) });
    }

    console.log(req.body);
    res.send("users route");
}

module.exports = { registerUser };
