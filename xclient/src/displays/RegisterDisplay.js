import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAlert, registerUser, logout } from "../manager";

function RegisterDisplay({ history }) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const { name, email, password, password2 } = formData;

    const dispatch = useDispatch();

    function changeHandler(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function submitHandler(e) {
        e.preventDefault();

        if(password !== password2) {
            dispatch(setAlert("danger", "Password does not match!"))
            return;
        }

        dispatch(registerUser({ name, email, password }, history));
        dispatch(setAlert("success", "Successfully registered!"))
    }

    return (
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={(e) => submitHandler(e)}>
                <div className="form-group">
                    <input 
                        type="text" 
                        placeholder="Name" 
                        name="name"
                        value={name}
                        onChange={(e) => changeHandler(e)} />
                </div>
                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email"
                        value={email}
                        onChange={(e) => changeHandler(e)} />
                    <small className="form-text">
                    This site uses Gravatar so if you want a profile image, use a
                    Gravatar email</small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => changeHandler(e)} />
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    value={password2}
                    onChange={(e) => changeHandler(e)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </>
    )
}

export default RegisterDisplay;
