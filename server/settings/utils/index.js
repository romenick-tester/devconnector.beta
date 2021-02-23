const connectDB = require("./db");
const {
    loginValidations, 
    registerValidations, 
    profileValidations, 
    experienceValidations, 
    educationValidations, 
    postValidations, 
    commentValidations } = require("./validationChecks");

module.exports = {
    connectDB,
    loginValidations, 
    registerValidations, 
    profileValidations, 
    experienceValidations, 
    educationValidations, 
    postValidations, 
    commentValidations };