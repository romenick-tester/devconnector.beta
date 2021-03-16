const { validationResult } = require("express-validator");
const axios = require("axios");
const normalize = require("normalize-url");
const dotenv = require("dotenv");
const { User, Profile } = require("../settings");

dotenv.config();

//route:        GET api/profile/me
//desc:         get current user profile
//access:       private  
const getUserProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate("user", ["name", "avatar"]);

        if (!profile) {
            res.status(404).json({
                errors: [{ msg: "There is no profile for this user." }]
            });
        } else {
            res.json(profile)
        }
    } catch (error) {
        res.status(500).json({
            errors: [{ msg: "There was a  problem with the server, please try again." }]
        });
    }
}

//route:        POST api/profile
//desc:         create or update user profile
//access:       private 
const createUserProfile = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { website, skills, youtube, twitter, instagram, linkedin, facebook, ...rest } = req.body;

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

    profileFields.social = socialFields;

    try {
        // Using upsert option (creates new doc if no match is found):
        let profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        ).populate("user", ["name", "avatar"]);

        return res.json(profile);
    } catch (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] });
    }
}

//route:        PUT api/profile/experience
//desc:         add or update user profile experience
//access:       private 
const addProfileExperience = async(req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, company, location, from, to, current, description } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({user: req.user.id});

        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile);
    } catch (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] });
    }
}

//route:        DELETE api/profile/experience/exp_id
//desc:         delete user profile experience
//access:       private 
const deleteProfileExperience = async(req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        const removeIndex = profile.experience.map((exp) => exp.id).indexOf(req.params.exp_id);

        profile.experience.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] });
    }
}

//route:        PUT api/profile/education
//desc:         add or update user profile education
//access:       private 
const addProfileEducation = async(req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newEdu = {
            school: req.body.school,
            level: req.body.level,
            fieldofstudy: req.body.fieldofstudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description
        };

        const profile = await Profile.findOne({user: req.user.id});

        profile.education.unshift(newEdu);

        await profile.save();

        res.json(profile);
    } catch (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] });
    }
}

//route:        DELETE api/profile/education/edu_id
//desc:         delete user profile education
//access:       private 
const deleteProfileEducation = async(req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        const removeIndex = profile.education.map((edu) => edu.id).indexOf(req.params.edu_id);

        profile.education.splice(removeIndex, 1);

        await profile.save();

        res.json(profile);
    } catch (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] });
    }
}


//route:        GET api/profile
//desc:         get all users profile
//access:       public  
const getAllProfiles = async(req,res) => {
    try {
        const profiles = await Profile.find().populate("user", ["name", "avatar"]);
        
        if(!profiles) {
            return res.status(404).json({ errors: [{ msg: "No profiles found!" }] })
        } else {
            res.json(profiles);
        }
    } catch (error) {
        return res.status(500).json({ errors: [{ msg: err.message }] });
    }
}

//route:        GET api/profile/:id
//desc:         get current user profile
//access:       private  
const getUserProfileByID = async(req,res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate("user", ["name", "avatar"]);
    
        if(!profile) {
            res.status(400).json({ errors: [{ msg: "No profile found!" }] });
        } else {
            res.json(profile);
        }
    } catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(400).json({ errors: [{ msg: "No profile found!" }] });
        }
        return res.status(500).json({ errors: [{ msg: err.message }] });
    }
}

//route:        GET api/profile
//desc:         delete user profile
//access:       private  
const deleteUserProfile = async(req,res) => {
    try {
        //remove users posts

        //remove profile
        await Profile.findOneAndRemove({user: req.user.id});
        //remove user
        await User.findOneAndRemove({_id: req.user.id});

        res.status(200).json({ msg: "user deleted!" });
    } catch (error) {
        console.error(error.message);
        if(error.kind === "ObjectId") {
            return res.status(400).json({ errors: [{ msg: "No profile found!" }] });
        }
        res.status(500).send("server error");
    }
}

//route:        GET api/profile/github/:username
//desc:         get user repos from github
//access:       public
//note:         https://api.github.com/users/romenick-tester/repos?per_page=5&sort=created:asc
const getGithubRepo = async(req,res) => {
    const mainUrl = "https://api.github.com/users/";

    try {
        const uri = encodeURI(`${mainUrl}${req.params.username}/repos?per_page=5&sort=created:asc`);
            
        const headers = {
            "user-agent": "node.js",
            Authorization: `token ${process.env.GITHUB_ACCESS_TOKEN}`
        };
          
        const { data } = await axios.get(uri, { headers });

        res.json(data);
    } catch (error) {
        return res.status(500).json({ errors: [{ msg: err.message }] });
    }
}

module.exports = {
    getUserProfile, 
    createUserProfile, 
    getAllProfiles, 
    getUserProfileByID, 
    deleteUserProfile, 
    addProfileExperience, 
    deleteProfileExperience, 
    addProfileEducation, 
    deleteProfileEducation, 
    getGithubRepo };