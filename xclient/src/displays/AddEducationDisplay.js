import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
// import { useDispatch } from "react-redux";

function AddEducationDisplay({ history }) {
    const [toDateDisabled, setToDateDisabled] = useState(false);
    const [form, setForm] = useState({
        school: "",
        level: "",
        fieldofstudy: "",
        from: "",
        to: "",
        current: false,
        description: ""
    })

    const { school, level, fieldofstudy, from, to, current, description } = form;

    const dispatch = useDispatch();

    const checkboxRef = useRef(null);
    const h4ToDateRef = useRef(null);

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        //dispatch addEducation(form)
        history.push("/dashboard");
    }

    return (
        <>
            <h1 className="large text-primary">
                Add Your Education
            </h1>
            <p className="lead">
                <i className="fas fa-graduation-cap"></i>
                    Add any school, bootcamp, etc that you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* School or Bootcamp"
                        name="school"
                        value={school}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Level or Certificate"
                        name="level"
                        value={level}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Field Of Study"
                        name="fieldofstudy"
                        value={fieldofstudy}
                        onChange={(e) => onChange(e)} />
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input
                        type="date"
                        name="from"
                        value={from}
                        onChange={(e) => onChange(e)} />
                </div>
                <div className="form-group">
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
                <div className="form-group">
                    <h4 ref={h4ToDateRef}>To Date</h4>
                    <input
                        type="date"
                        name="to"
                        value={to}
                        onChange={(e) => onChange(e)}
                        disabled={toDateDisabled} />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        value={description} onChange={(e) => onChange(e)}
                        cols="30"
                        rows="5"
                        placeholder="Program Description">
                    </textarea>
                </div>
                <input type="submit" className="btn btn-primary my-1" />
                <Link to="/dashboard" className="btn btn-light my-1">Go Back</Link>
            </form>
        </>
    )
}

export default AddEducationDisplay;