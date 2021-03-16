const dotenv = require("dotenv");
const { User } = require("../settings");

dotenv.config();

const userDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        res.json({ user });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ errors: [{ msg: "Invalid credentials 🚩" }] });
    }
}

const getAllUsers = async(req, res) => {
    try {
        const users = await User.find().select(["email", "-_id"]);
        
        if(!users) {
            return res.status(400).json({ errors: [{ msg: "No users found! 🚩" }] });
        }
    
        res.json({ users })
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = { userDetails, getAllUsers };
