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
        if (profile) {
            setDeveloper(profile);
        }
    }, [profile]);

    if (loading) {
        return <h4>Loading...</h4>
    }

    if (error) {
        return <h4>Error...</h4>
    }

    console.log(developer);
    return (
        <div>
            <h4>single profile display component</h4>
        </div>
    )
}

export default SingleProfileDisplay;
