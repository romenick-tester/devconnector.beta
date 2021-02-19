const { check } = require("express-validator");

const registerValidations = [
    check("name", "Name is required.").not().isEmpty(),
    check("email", "Enter a valid email.").isEmail(),
    check("password", "Enter a password with 6 or more characters").isLength({ min: 6 })
]

const loginValidations = [
    check("email", "Valid email is required.").isEmail(),
    check("password", "Password is required.").not().isEmpty()
]

const profileValidations = [
    check("status", "Status is required.").not().isEmpty(),
    check("skills", "Skills is required.").not().isEmpty()
]

module.exports = { registerValidations, loginValidations, profileValidations };