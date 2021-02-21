const connectDB = require("./db");
const {
    loginValidations, 
    registerValidations, 
    profileValidations, 
    experienceValidations, 
    educationValidations } = require("./validationChecks");

module.exports = {
    connectDB,
    loginValidations, 
    registerValidations, 
    profileValidations, 
    experienceValidations, 
    educationValidations };