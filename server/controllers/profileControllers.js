const { validationResult } = require("express-validator");
const normalize = require("normalize-url");
const { User, Profile } = require("../settings");

//route:        PUT api/profile/experience
//desc:         add or update user profile experience
//access:       private 
const addProfileExperience = async(req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

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
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
}

//route:        DELETE api/profile/experience
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
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
}

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
        ).populate("user", ["name", "avatar"]);

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

//route:        GET api/profile
//desc:         get all users profile
//access:       public  
const getAllProfiles = async(req,res) => {
    try {
        const profiles = await Profile.find().populate("user", ["name", "avatar"]);
        
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
        const profile = await Profile.findOne({user: req.params.user_id}).populate("user", ["name", "avatar"]);
    
        if(!profile) {
            return res.status(400).json({ errors: [{ msg: "No profile found!" }] });
        }
        
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        if(error.kind === "ObjectId") {
            return res.status(400).json({ errors: [{ msg: "No profile found!" }] });
        }
        res.status(500).send("server error");
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

        res.json({ msg: "user deleted!" })
    } catch (error) {
        console.error(error.message);
        if(error.kind === "ObjectId") {
            return res.status(400).json({ errors: [{ msg: "No profile found!" }] });
        }
        res.status(500).send("server error");
    }
}

module.exports = {
    getUserProfile, 
    createUserProfile, 
    getAllProfiles, 
    getUserProfileByID, 
    deleteUserProfile, 
    addProfileExperience, 
    deleteProfileExperience };