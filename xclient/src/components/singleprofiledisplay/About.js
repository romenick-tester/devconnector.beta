import React from 'react';
import Bio from "./Bio";
import Skills from "./Skills";

function About({ bio, skills, user }) {
    return (
        <div className="profile-about bg-light p-2">
            { bio && (
                <>
                    < Bio bio={bio} user={user} />
                    <div className="line"></div>
                </>
            )}
                
            <Skills skills={skills} />
        </div>
    )
}

export default About;
