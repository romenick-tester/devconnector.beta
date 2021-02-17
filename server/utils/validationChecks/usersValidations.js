const { check } = require("express-validator");

const registerValidation = [
    check("name", "Name is required.").not().isEmpty(),
    check("email", "Enter a valid email.").isEmail(),
    check("password", "Enter a password with 6 or more characters").isLength({ min: 6 })
]

module.exports = { registerValidation };