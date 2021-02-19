const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./utils/db");
const { usersRoutes, profileRoutes, authRoutes, postsRoutes } = require("./routes/api");

const app = express();
connectDB();
dotenv.config();

app.use(express.json({ extended: false }));

app.get("/", (req,res) => res.send("root route"));
app.use("/api/users", usersRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", postsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}.`));