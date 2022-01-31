import React, {useEffect} from 'react';
import SignOut_Initialize from "../Actions/SignOut_Actions";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import checkUser from "../Actions/CheckUser";
import Loader from "./Loader/Loader";

const User = () => {
    const user = useSelector((State => State.user));
    const navigate = useNavigate();
    const dispach = useDispatch();
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("User"));
        if(!data.login) navigate("/");
        else {
            dispach(checkUser(data));
        }
    }, [user.payload.login])
    return (
        <>
            {
                user.payload.loading ? <Loader/> :
                    <div>
                        <h1>User</h1>
                        <button className="btn btn-outline-primary" onClick={() => {
                            dispach(SignOut_Initialize())
                        }}>Sign Out
                        </button>
                    </div>
            }
        </>
    );
};

export default User;
