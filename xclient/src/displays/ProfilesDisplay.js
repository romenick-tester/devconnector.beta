import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getProfileList } from "../manager";

function ProfilesDisplay() {
    const [developers, setDevelopers] = useState([]);

    const dispatch = useDispatch();
    const {
        profile_list_loading: loading,
        profile_list_error: error,
        profile_list: profiles
    } = useSelector(state => state.profiles);

    useEffect(() => {
        dispatch(getProfileList());
    }, [dispatch]);

    useEffect(() => {
        setDevelopers(profiles);
    }, [profiles]);

    if (loading) {
        return <h1>Loading... </h1>
    }

    if (error) {
        return <h1>Error...</h1>
    }

    return (
        <div>
            <h1>Current Users:</h1>
            <ul>
                {developers.map((dev) => {
                    const { user } = dev;
                    return <li key={dev._id}>{user.name}</li>
                })}
            </ul>
        </div>
    )
}

export default ProfilesDisplay;
