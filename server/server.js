const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}.`));