import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getProfileList, setAlert } from "../manager";
import { SingleProfile, Loader } from "../components";

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
        return <Loader />
    }

    if (error) {
        dispatch(setAlert("danger", "Profile list not found!"));
    }

    return (
        <div>
            <h1>Current Users:</h1>
            {developers.map((dev) => {
                return <SingleProfile key={dev._id} {...dev} />
            })}
        </div>
    )
}

export default ProfilesDisplay;
