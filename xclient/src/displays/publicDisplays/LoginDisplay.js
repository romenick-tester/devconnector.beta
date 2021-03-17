import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../manager";

function LoginDisplay({ history, location }) {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const { email, password } = form;

    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);
    const { loading, authenticated } = auth;

    useEffect(() => {
        if (!loading && authenticated) {
            history.push("/dashboard");
        }
    }, [dispatch, loading, authenticated, history])

    function changeHandler(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(form));
    }

    return (
        <>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign In To Your Account</p>
            <form className="form" onSubmit={submitHandler}>
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
