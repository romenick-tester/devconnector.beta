import React, { useState } from "react";
import { Link } from "react-router-dom";
import sendForm from "../manager/agents/useSend";

function LoginDisplay() {
    const [loginData, setLoginData] = useState(null);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData;

    function changeHandler(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const submitHandler = async(e) => {
        e.preventDefault();

        const endpoint = "/api/auth";

        const data = await sendForm(endpoint, { email, password });

        setLoginData(data);
    }

    if(loginData){
        console.log(loginData);
    }

    return (
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={(e) => submitHandler(e)}>
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
                        minLength="6"
                        value={password}
                        onChange={(e) => changeHandler(e)} />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Not yet registered? <Link to="/register">Register</Link>
            </p>
        </>
    )
}

export default LoginDisplay;
