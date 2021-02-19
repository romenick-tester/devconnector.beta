const { User, Profile } = require("../models");


const createUserProfile = async(req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["name", "avatar"]);

        if(!profile) {
            return res.status(400).json({ errors: [{ msg: "There is no profile for this user." }] });
        }

        res.json(profile)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: [{ msg: "500: Server error" }] })
    }
}

const getUserProfile = async(req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["name", "avatar"]);

        if(!profile) {
            return res.status(400).json({ errors: [{ msg: "There is no profile for this user." }] });
        }

        res.json(profile)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: [{ msg: "500: Server error" }] })
    }
}

module.exports = { getUserProfile, createUserProfile };