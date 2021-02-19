const { validationResult } = require("express-validator");
const normalize = require("normalize-url");
const { User, Profile } = require("../models");

//route:        POST api/profile
//desc:         create or update user profile
//access:       private 
const createUserProfile = async(req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const {
        website,
        skills,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
        ...rest
    } = req.body;

    const profileFields = {
        user: req.user.id,
        website: website && website !== "" ? normalize(website, { forceHttps: true }) : "",
        skills: Array.isArray(skills) ? skills : skills.split(',').map((skill) => ' ' + skill.trim()),
        ...rest
    };

    const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    // normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
        if (value && value.length > 0)
        socialFields[key] = normalize(value, { forceHttps: true });
    }

    // add to profileFields
    profileFields.social = socialFields;

    try {
      // Using upsert option (creates new doc if no match is found):
        let profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return res.json(profile);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
}

//route:        GET api/profile/me
//desc:         get current user profile
//access:       private  
const getUserProfile = async(req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate("users", ["name", "avatar"]);

        if(!profile) {
            return res.status(400).json({ errors: [{ msg: "There is no profile for this user." }] });
        }

        res.json(profile)
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ errors: [{ msg: "500: Server error" }] })
    }
}

//route:        GET api/profile
//desc:         get all users profile
//access:       public  
const getAllProfiles = async(req,res) => {
    try {
        const profiles = await Profile.find().populate("users", ["name", "avatar"]);
        
        if(!profiles) {
            return res.status(404).json({ errors: [{ msg: "No profiles found!" }] })
        }
    
        res.json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
}

//route:        GET api/profile/:id
//desc:         get current user profile
//access:       private  
const getUserProfileByID = async(req,res) => {
    try {
        const profile = await Profile.findById(req.params.id);
    
        if(!profile) {
            return res.status(404).json({ errors: [{ msg: "No profile found!" }] })
        }
        
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
}

module.exports = { getUserProfile, createUserProfile, getAllProfiles, getUserProfileByID };