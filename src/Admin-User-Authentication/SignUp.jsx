import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import "./SignUp.css"
import auth from "../firebase";
import axios from "axios";

const SignUp = () => {
    const [signUpDetails, setSignUpDetails] = useState({
        username: "",
        email: "",
        password: "",
        confirmpass: ""
    })
    const [isAdmin, setIsAdmin] = useState(false);

    const detailsHandler = (event) => {
        const {name, value} = event.target;
        setSignUpDetails((preValue) => {
            return {
                ...preValue,
                [name]: value,
            }
        })
    }

    const isAdminHandler = (event) => {
        setIsAdmin(!isAdmin);
    }

    const submitSignUp = (event) => {
        event.preventDefault();
        if (signUpDetails.password === signUpDetails.confirmpass) {
            const {email, password, username} = signUpDetails;
            auth.createUserWithEmailAndPassword(email, password).then(({user}) => {
                user.updateProfile({username});
                if (isAdmin) {
                    try {
                        const userID = {
                            userid: user.uid,
                        }
                        axios.post(`https://admin-user-authentication-default-rtdb.firebaseio.com/Admin.json`, userID);
                    } catch (e) {
                        console.log(e);
                    }

                }
            })
        }
        setSignUpDetails({
            username: "",
            email: "",
            password: "",
            confirmpass: ""
        })
        setIsAdmin(false);
    }

    return (
        <>
            <div className="signup-form">
                <div className="sform">
                    <form className="form-horizontal" onSubmit={submitSignUp}>
                        <div className="row">
                            <div className="col-8 offset-4">
                                <h2>Sign Up</h2>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-4">Username</label>
                            <div className="col-8">
                                <input type="text" className="form-control" name="username" required="required"
                                       value={signUpDetails.username} onChange={detailsHandler}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-4">Email Address</label>
                            <div className="col-8">
                                <input type="text" className="form-control" name="email" required="required"
                                       value={signUpDetails.email} onChange={detailsHandler}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-4">Password</label>
                            <div className="col-8">
                                <input type="password" className="form-control" name="password"
                                       required="required"
                                       value={signUpDetails.password} onChange={detailsHandler}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label col-4">Confirm Password</label>
                            <div className="col-8">
                                <input type="password" className="form-control" name="confirmpass"
                                       required="required"
                                       value={signUpDetails.confirmpass} onChange={detailsHandler}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>isAdmin: </label>
                            <input type="checkbox" placeholder="isAdmin"
                                   name="isAdmin" value={isAdmin} onChange={isAdminHandler}/>
                        </div>
                        <div className="form-group row">
                            <div className="col-8 offset-4">
                                <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
                            </div>
                        </div>
                    </form>
                    <div className="text-center">Already have an account? <Link to="/Login">Login here</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
