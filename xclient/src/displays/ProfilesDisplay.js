import React, { useEffect, useState } from 'react';
import { FaConnectdevelop } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getProfileList, setAlert } from "../manager";
import { SingleProfile, Loader } from "../components";

function ProfilesDisplay() {
    const [coders, setCoders] = useState([])

    const dispatch = useDispatch();
    const {
        profile_list_loading: loading,
        profile_list_error: error,
        profile_list: profiles
    } = useSelector(state => state.profiles);
    const { single_profile } = useSelector(state => state.user_profile);

    useEffect(() => {
        dispatch(getProfileList());
    }, [dispatch]);

    useEffect(() => {
        setCoders(profiles);
    }, [profiles]);

    if (loading) {
        return <Loader />
    }

    if (error) {
        dispatch(setAlert("danger", "Profile list not found!"));
        return <h4>Error found!</h4>
    }

    return (
        <>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
                <FaConnectdevelop /> Browse and connect with developers
            </p>
            <div className="profiles">
                {coders.filter((x) => x._id !== single_profile._id).map((coder) => {
                    return <SingleProfile key={coder._id} coder={coder} />
                })}
            </div>
        </>
    )
}

export default ProfilesDisplay;
