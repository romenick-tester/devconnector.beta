const dotenv = require("dotenv");
const express = require("express");
const { connectDB } = require("./settings");
const { usersRoutes, profileRoutes, authRoutes, postsRoutes } = require("./routes");

const app = express();
connectDB();
dotenv.config();

app.use(express.json({ extended: false }));

app.get("/", (req,res) => res.send("root route"));
app.use("/api/users", usersRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);

app.all("*", (req, res) => {
    res.status(404).send(`<strong>${req.originalUrl}</strong> page does not exist!`)
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}.`));