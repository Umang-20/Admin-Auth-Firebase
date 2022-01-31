import React, {useEffect} from 'react';
import SignOut_Initialize from "../Actions/SignOut_Actions";
import {useDispatch, useSelector} from "react-redux";
import Loader from "./Loader/Loader";
import {useNavigate} from "react-router";
import checkUser from "../Actions/CheckUser";

const Admin = () => {
    const user = useSelector((State => State.user));
    const navigate = useNavigate();
    const dispach = useDispatch();
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("User"));
        if(!data.login) navigate("/");
        else {
            dispach(checkUser(data));
        }
    }, [dispach,navigate,user.payload.login])

    return (
        <>
            {
                user.payload.loading?<Loader/>:
                    <div>
                        <h1>Admin</h1>
                        <button className="btn btn-outline-primary" onClick={() => {
                            dispach(SignOut_Initialize())
                        }}>Sign Out
                        </button>
                    </div>
            }
        </>
    );
};

export default Admin;
