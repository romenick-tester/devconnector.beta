const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const app = express();

connectDB();
dotenv.config();

app.use(express.json());

app.get("/", (req,res) => res.send("API ready!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}.`));