const dotenv = require("dotenv");
const express = require("express");
const { connectDB } = require("./settings");
const path = require("path");
const { usersRoutes, profileRoutes, authRoutes, postsRoutes } = require("./routes");

const app = express();
connectDB();
dotenv.config();

app.use(express.json({ extended: false }));

app.use("https://ukdevconnector.herokuapp.com/api/users", usersRoutes);
app.use("https://ukdevconnector.herokuapp.com/api/profile", profileRoutes);
app.use("https://ukdevconnector.herokuapp.com/api/auth", authRoutes);
app.use("https://ukdevconnector.herokuapp.com/api/posts", postsRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../xclient/build")));

    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "../xclient", "build", "index.html")));
} else {
    app.get("/", (req, res) => res.send("Server is up and running..."));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}.`));