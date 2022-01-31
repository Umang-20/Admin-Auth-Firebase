import React, {useState} from 'react';
import {Link} from "react-router-dom";
import "./Login.css"
import auth from "../firebase";
import axios from "axios";

const Login = () => {
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
    });
    const [isAdmin, setIsAdmin] = useState(false);

    const detailsHandler = (event) => {
        const {name, value} = event.target;
        setLoginDetails((preValue) => {
            return {
                ...preValue,
                [name]: value,
            }
        })
    }

    const submitLogin=(event) =>{
        event.preventDefault();
        const {email,password} = loginDetails;
        auth.signInWithEmailAndPassword(email,password).then(async ({user}) => {
            const resp = await axios.get(`https://admin-user-authentication-default-rtdb.firebaseio.com/Admin.json`);

            let fetchData = [];
            for (let key in resp.data) {
                fetchData.push(
                    resp.data[key],
                );
            }
            if(fetchData.find((element)=>element.userid===user.uid)){
                console.log("Admin");
            }
            else{
                console.log("User");
            }
        })

    }


    return (
        <>
            <div className="login-form">
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
                            <button type="submit" className="btn btn-primary btn-block">Log in</button>
                        </div>
                    </form>
                    <p className="text-center"><Link to="/SignUp">Create an Account</Link></p>
                </div>

            </div>

        </>
    );
};

export default Login;
