import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

function CreateProfileDisplay({ history }) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        company: "",
        website: "",
        location: "",
        status: "",
        skills: "",
        bio: "",
        githubusername: "",
        youtube: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        instagram: ""
    });

    const {
        company, website, location, status, skills, bio, githubusername,
        youtube, twitter, facebook, linkedin, instagram } = form;

    const dispatch = useDispatch();

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        // dispatch(createUserProfile(form, history));
    }

    return (
        <>
            <h1 className="large text-primary">
                Create Your Profile
      </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
            <small>* = required field</small>
            <form className="form" onSubmit={(e) => onSubmitHandler(e)}>
                <div className="form-group">
                    <select name="status" value={status} onChange={(e) => onChangeHandler(e)}>
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">
                        Give us an idea of where you are at in your career</small>

                </div>
                <div className="form-group">
                    <input type="text" placeholder="Company" name="company" value={company} onChange={(e) => onChangeHandler(e)} />
                    <small className="form-text">
                        Could be your own company or one you work for</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" value={website} onChange={(e) => onChangeHandler(e)} />
                    <small className="form-text">
                        Could be your own or a company website</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="location" value={location} onChange={(e) => onChangeHandler(e)} />
                    <small className="form-text">
                        City & state suggested (eg. Boston, MA)</small>

                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="skills" value={skills} onChange={(e) => onChangeHandler(e)} />
                    <small className="form-text">
                        Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Github Username"
                        name="githubusername" value={githubusername} onChange={(e) => onChangeHandler(e)}
                    />
                    <small className="form-text">
                        If you want your latest repos and a Github link, include your username</small>
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" name="bio" value={bio} onChange={(e) => onChangeHandler(e)}></textarea>
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                    <button type="button" className="btn btn-light" onClick={() => setShow(!show)}>
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>
                {show && (
                    <>
                        <div className="form-group social-input">
                            <i className="fab fa-twitter fa-2x"></i>
                            <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={(e) => onChangeHandler(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={(e) => onChangeHandler(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={(e) => onChangeHandler(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x"></i>
                            <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={(e) => onChangeHandler(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"></i>
                            <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={(e) => onChangeHandler(e)} />
                        </div>
                    </>
                )}
                <input type="submit" className="btn btn-primary my-1" />
                <Link to="/dashboard" className="btn btn-light my-1">Go Back</Link>
            </form>
        </>
    )
}

export default CreateProfileDisplay;
