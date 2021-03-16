import React, { useEffect, useState } from 'react';
import { FaConnectdevelop } from "react-icons/fa";
//import { useDispatch, useSelector } from "react-redux";
import { ProfilesItem, Loader } from "../components";

function ProfilesDisplay() {
    const [coders, setCoders] = useState([])

    const dispatch = useDispatch();
    const {
        profile_list_loading: loading,
        profile_list_error: error,
        profile_list: profiles
    } = useSelector(state => state.profiles);

    useEffect(() => {
        //dispatch(getProfileList());
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
                {coders.map((coder) => {
                    return <ProfilesItem key={coder._id} coder={coder} />
                })}
            </div>
        </>
    )
}

export default ProfilesDisplay;
