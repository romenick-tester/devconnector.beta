const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const db = process.env.MONGODB_URI || "mongodb://localhost:27017";

const connectDB = async() => {
    try {
        await mongoose.connect(db, {
            dbName: "devconnector",
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true
        });

        console.log("mongodb connected...");
    } catch (error) {
        console.error(error.message);
        process.exit(1); //exit process with failure
    }
}

module.exports = connectDB;