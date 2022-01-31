import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import "./Login.css"
import {useDispatch, useSelector} from "react-redux";
import Login_Initialize from "../Actions/Login_Actions";
import resetError from "../Actions/resetError";
import {useNavigate} from "react-router";
import Loader from "./Loader/Loader";

const Login = () => {
    const [loginDetails, setLoginDetails] = useState({
        email: "", password: "",
    });

    const [error, setError] = useState("");

    const user = useSelector((State => State.user));
    const dispach = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        setError(user.payload.error);
    }, [user.payload.error])

    useEffect(() => {
        dispach(resetError());
    }, [dispach])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("User"));
        // console.log(a)
        if (data.login && data.isAdmin) {
            navigate("/Admin");
        } else if (data.login) {
            navigate("/User");
        }
    }, [navigate,user])

    const detailsHandler = (event) => {
        const {name, value} = event.target;
        setLoginDetails((preValue) => {
            return {
                ...preValue, [name]: value,
            }
        })
        setError("");
    }

    const submitLogin = (event) => {
        event.preventDefault();
        const {email, password} = loginDetails;
        dispach(Login_Initialize(email, password));
        setLoginDetails({
            email: "", password: "",
        });

    }

    return (<>
        {user.payload.loading ? <Loader/> : <div className="login-form">
            <div className="lform">
                <form onSubmit={submitLogin}>
                    <h2 className="text-center">Log in</h2>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Email" required="required"
                               name="email"
                               value={loginDetails.email} onChange={detailsHandler}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password"
                               required="required"
                               name="password" value={loginDetails.password} onChange={detailsHandler}/>
                    </div>
                    <div className="form-group">
                        <p style={{color: "red"}}>{error}</p>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-block">Log in</button>
                    </div>
                </form>
                <p className="text-center"><Link to="/">Create an Account</Link></p>
            </div>
        </div>}

    </>);
};

export default Login;
