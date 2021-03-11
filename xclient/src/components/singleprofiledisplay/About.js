import React from 'react';
import Bio from "./Bio";
import Skills from "./Skills";

function About({ bio, skills, user }) {
    return (
        <div className="profile-about bg-light p-2">
            <Bio bio={bio} user={user} />

            <div class="line"></div>

            <Skills skills={skills} />
        </div>
    )
}

export default About;
