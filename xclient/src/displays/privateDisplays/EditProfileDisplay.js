import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createProfile } from "../../manager";
import { Link } from "react-router-dom";

function EditProfileDisplay({ history }) {
    const [show, setShow] = useState(false);

    const profile = useSelector(state => state.profile);
    const { loading, privateProfile: profiling } = profile;

    const {
        company = "", website = "", location = "", status = "", skills = [],
        bio = "", githubusername = "", social = {} } = profiling ? profiling : {};

    const { youtube = "", twitter = "", facebook = "", linkedin = "", instagram = "" } = social;

    const [form, setForm] = useState({
        _company: company, _website: website, _location: location, _status: status,
        _skills: skills, _bio: bio, _githubusername: githubusername, _youtube: youtube,
        _twitter: twitter, _facebook: facebook, _linkedin: linkedin, _instagram: instagram
    });
    
    const {
        _company, _website, _location, _status, _skills, _bio, _githubusername,
        _youtube, _twitter, _facebook, _linkedin, _instagram } = form;

    const dispatch = useDispatch();

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(createProfile(form, history, true));
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
                    <select name="_status" value={_status} onChange={(e) => onChangeHandler(e)}>
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
                    <input type="text" placeholder="Company" name="_company" value={_company} onChange={(e) => onChangeHandler(e)} />
                    <small className="form-text">
                        Could be your own company or one you work for</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="_website" value={_website} onChange={(e) => onChangeHandler(e)} />
                    <small className="form-text">
                        Could be your own or a company website</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="_location" value={_location} onChange={(e) => onChangeHandler(e)} />
                    <small className="form-text">
                        City & state suggested (eg. Boston, MA)</small>

                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Skills" name="_skills" value={_skills} onChange={(e) => onChangeHandler(e)} />
                    <small className="form-text">
                        Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Github Username"
                        name="_githubusername" value={_githubusername} onChange={(e) => onChangeHandler(e)}
                    />
                    <small className="form-text">
                        If you want your latest repos and a Github link, include your username</small>
                </div>
                <div className="form-group">
                    <textarea placeholder="A short bio of yourself" name="_bio" value={_bio} onChange={(e) => onChangeHandler(e)}></textarea>
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
                            <input type="text" placeholder="Twitter URL" name="_twitter" value={_twitter} onChange={(e) => onChangeHandler(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-facebook fa-2x"></i>
                            <input type="text" placeholder="Facebook URL" name="_facebook" value={_facebook} onChange={(e) => onChangeHandler(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-youtube fa-2x"></i>
                            <input type="text" placeholder="YouTube URL" name="_youtube" value={_youtube} onChange={(e) => onChangeHandler(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-linkedin fa-2x"></i>
                            <input type="text" placeholder="Linkedin URL" name="_linkedin" value={_linkedin} onChange={(e) => onChangeHandler(e)} />
                        </div>

                        <div className="form-group social-input">
                            <i className="fab fa-instagram fa-2x"></i>
                            <input type="text" placeholder="Instagram URL" name="_instagram" value={_instagram} onChange={(e) => onChangeHandler(e)} />
                        </div>
                    </>
                )}
                <input type="submit" className="btn btn-primary my-1" />
                <Link to="/dashboard" className="btn btn-light my-1">Go Back</Link>
            </form>
        </>
    )
}

export default EditProfileDisplay;
