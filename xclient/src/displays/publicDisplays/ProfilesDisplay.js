import React, { useEffect } from 'react';
import { FaConnectdevelop } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getAllProfiles } from "../../manager";
import { ProfilesItem, Loader } from "../../components";

function ProfilesDisplay() {

    const dispatch = useDispatch();
    const profiles = useSelector(state => state.profiles)
    const { loading, error, list } = profiles;

    useEffect(() => {
        dispatch(getAllProfiles());
    }, [dispatch]);

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <h4>{error}</h4>
    }

    return (
        <>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
                <FaConnectdevelop /> Browse and connect with developers
            </p>
            <div className="profiles">
                {list && list.map((item) => {
                    return <ProfilesItem key={item._id} details={item} />
                })}
            </div>
        </>
    )
}

export default ProfilesDisplay;
