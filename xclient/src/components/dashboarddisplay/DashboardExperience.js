import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { useDispatch } from "react-redux";
import DashboardExpItem from "./DashboardExperienceItem";

function ProfileExperience({ experience: exp }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [experience, setExperience] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        if (exp) {
            setExperience(exp);
            setLoading(false);
        } else {
            setLoading(false);
            setError(true);
        }
    }, [exp]);

    if (loading) {
        return <h3>loading...</h3>
    }

    if (error) {
        return <h3>Error...</h3>
    }

    // function removeExp(id) {
    //     const isConfirmed = window.confirm("You want to delete ?");

    //     if (isConfirmed) {
    //         console.log("experience deleted!");
    //         //dispatch(deleteProfileExperience(id));
    //     }
    // }

    return (
        <>
            <h2 className="my-2">Experience</h2>
            <Table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {experience
                        .sort((a, b) => {
                            const sortByFromDate = (Number(b.from.slice(0, 4))) - (Number(a.from.slice(0, 4)))
                            return sortByFromDate;
                        })
                        .map((item = { _id: "" }) => {
                            return <DashboardExpItem key={item._id} {...item} /* removeExp={removeExp} */ />
                        })
                    }
                    {experience.length === 0 && (
                        <tr>
                            <td colSpan={4}>
                                N/A
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </>
    )
}

const Table = styled.table`
    min-width: 800px;

    span {
        color: grey;
        font-size: 0.6rem;
        display: block;
    }
`

export default ProfileExperience;
