import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAlert, register } from "../../manager";

function RegisterDisplay({ history, location }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });

    const { name, email, password, password2 } = form;

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const { loading, authenticated } = auth;

    useEffect(() => {
        if (!loading && authenticated) {
            history.push("/dashboard");
        }
    }, [loading, authenticated, dispatch, history]);

    function changeHandler(e) {
        const { name, value } = e.target;

        setForm((preState) => {
            return {
                ...preState,
                [name]: value
            }
        });
    }

    function submitHandler(e) {
        e.preventDefault();

        if (password !== password2) {
            dispatch(setAlert("danger", "Password does not match!"))
        } else {
            dispatch(register({ name, email, password }));
        }
    }

    return (
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={submitHandler}>
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
