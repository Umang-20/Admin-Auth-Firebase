import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import "./SignUp.css"
import {useDispatch, useSelector} from "react-redux";
import SignUp_Initialize from "../Actions/SignUp_Actions";
import {useNavigate} from "react-router";
import resetError from "../Actions/resetError";
import Loader from "./Loader/Loader";

const SignUp = () => {
    const [signUpDetails, setSignUpDetails] = useState({
        email: "",
        password: "",
        confirmpass: ""
    })

    const [error, setError] = useState("");

    const user = useSelector((State=>State.user));
    const dispach = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        setError(user.payload.error);
    },[user.payload.error])

    useEffect(()=>{
        dispach(resetError());
    },[dispach])

    useEffect(()=>{
        if(user.payload.isSignUp){
            navigate("/Login");
        }
    },[navigate,user.payload.isSignUp])


    const detailsHandler = (event) => {
        const {name, value} = event.target;
        setSignUpDetails((preValue) => {
            return {
                ...preValue,
                [name]: value,
            }
        })
        setError("");
    }

    const submitSignUp = (event) => {
        event.preventDefault();
        const {email,password,confirmpass} = signUpDetails;
        if(password === confirmpass){
            dispach(SignUp_Initialize(email,password));
        }
        else{
            setError("Passwords Doesn't Match");
        }
        setSignUpDetails({
            username: "",
            email: "",
            password: "",
            confirmpass: ""
        })
    }

    return (
        <>
            {
                user.payload.loading?<Loader/>:
                    <div className="signup-form">
                        <div className="sform ">
                            <form className="form-horizontal" onSubmit={submitSignUp}>
                                <div className="row">
                                    <div className="col-8 offset-4">
                                        <h2>Sign Up</h2>
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
                                <div className="form-group row">
                                    <p style={{color:"red"}}>{error}</p>
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
            }
        </>
    );
};

export default SignUp;
