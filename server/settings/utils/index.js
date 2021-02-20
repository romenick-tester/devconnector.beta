const connectDB = require("./db");
const { loginValidations, registerValidations, profileValidations } = require("./validationChecks");

module.exports = {
    connectDB,
    loginValidations, 
    registerValidations, 
    profileValidations };