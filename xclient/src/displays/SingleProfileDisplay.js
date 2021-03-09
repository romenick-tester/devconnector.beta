import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileById } from "../manager";

function SingleProfileDisplay({ match }) {
    const [developer, setDeveloper] = useState({});

    const userId = match.params.id;

    const dispatch = useDispatch();
    const {
        profile_byId_loading: loading,
        profile_byId_error: error,
        profile_byId: profile
    } = useSelector(state => state.user_byId);

    useEffect(() => {
        dispatch(getUserProfileById(userId))
    }, [userId, dispatch]);

    useEffect(() => {
        setDeveloper(profile);
    }, [profile]);

    if (loading) {
        return <h4>Loading...</h4>
    }

    if (error) {
        return <h4>Error...</h4>
    }

    const {
        bio = "", company = "", education = [], experience = [], githubusername = "",
        location = "", skills = [], social = {}, status = "", user = {} } = developer;
    return (
        <div>
            <h1>{user.name}</h1>
            <h4>Experiences:</h4>
            <ul>{experience.map((exp, index) => {
                return <li key={index}>{exp.title}</li>
            })}</ul>
        </div>
    )
}

export default SingleProfileDisplay;
