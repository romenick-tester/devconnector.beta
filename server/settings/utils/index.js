const connectDB = require("./db");
const {
    loginValidations, 
    registerValidations, 
    profileValidations, 
    experienceValidations } = require("./validationChecks");

module.exports = {
    connectDB,
    loginValidations, 
    registerValidations, 
    profileValidations, 
    experienceValidations };