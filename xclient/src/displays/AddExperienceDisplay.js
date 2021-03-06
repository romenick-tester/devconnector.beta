import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProfileExperience } from "../manager";

function AddExperienceDisplay({ history }) {
    const [toDateDisabled, setToDateDisabled] = useState(false);
    const [form, setForm] = useState({
        title: "",
        company: "",
        location: "",
        from: "",
        to: "",
        current: false,
        description: ""
    })

    const { title, company, location, from, to, current, description } = form;

    const dispatch = useDispatch();

    const checkboxRef = useRef(null);
    const h4ToDateRef = useRef(null);

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addProfileExperience(form));
        history.push("/dashboard");
    }

    return (
        <>
            <h1 class="large text-primary">
                Add An Experience
            </h1>
            <p class="lead">
                <i class="fas fa-code-branch"></i>
                Add any developer/programming positions that you have had in the past
            </p>
            <small>* = required field</small>
            <form class="form" onSubmit={onSubmit}>
                <div class="form-group">
                    <input
                        type="text"
                        placeholder="* Job Title"
                        name="title"
                        value={title}
                        onChange={(e) => onChange(e)}
                        required />
                </div>
                <div class="form-group">
                    <input
                        type="text"
                        placeholder="* Company"
                        name="company"
                        value={company}
                        onChange={(e) => onChange(e)}
                        required />
                </div>
                <div class="form-group">
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={location}
                        onChange={(e) => onChange(e)} />
                </div>
                <div class="form-group">
                    <h4>From Date</h4>
                    <input
                        type="date"
                        name="from"
                        value={from}
                        onChange={(e) => onChange(e)} />
                </div>
                <div class="form-group">
                    <p ref={checkboxRef}>
                        <input
                            type="checkbox"
                            checked={current}
                            name="current"
                            value={current}
                            onChange={(e) => {
                                setForm({ ...form, current: true });
                                checkboxRef.current.innerHTML = `<h2>ongoing</h2>`
                                h4ToDateRef.current.style.textDecoration = "line-through";
                                setToDateDisabled(!toDateDisabled);
                            }} /> Current ?
                    </p>
                </div>
                <div class="form-group">
                    <h4 ref={h4ToDateRef}>To Date</h4>
                    <input
                        type="date"
                        name="to"
                        value={to}
                        onChange={(e) => onChange(e)}
                        disabled={toDateDisabled} />
                </div>
                <div class="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Job Description"
                        value={description}
                        onChange={(e) => onChange(e)}
                    ></textarea>
                </div>
                <input type="submit" class="btn btn-primary my-1" />
                <Link to="/dashboard" class="btn btn-light my-1">Go Back</Link>
            </form>
        </>
    )
}

export default AddExperienceDisplay;
