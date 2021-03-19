const dotenv = require("dotenv");
const express = require("express");
const { connectDB } = require("./settings");
const path = require("path");
const { usersRoutes, profileRoutes, authRoutes, postsRoutes } = require("./routes");

const app = express();
connectDB();
dotenv.config();

app.use(express.json({ extended: true }));

app.use("/api/users", usersRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}.`));