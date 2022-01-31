import React, {useEffect, useState} from 'react';
// import Login from "./Admin-User-Authentication/Login";
import {Route, Routes} from "react-router";
// import SignUp from "./Admin-User-Authentication/SignUp";
// import Home from "./Admin-User-Authentication/Home";
import Login from "./SignUp Pages with Login/Login"
import SignUp from "./SignUp Pages with Login/SignUp";
import {useSelector} from "react-redux";
import Admin from "./SignUp Pages with Login/Admin";
import User from "./SignUp Pages with Login/User";
import NotloginUser from "./SignUp Pages with Login/NotloginUser";
import Error from "./SignUp Pages with Login/404";
// import Form from "./Checkbox-Form/Form";

const App = () => {

    const [isAdmin, setIsAdmin] = useState(null);
    const [isLogin, setIsLogin] = useState(null);

    const user = useSelector((State => State.user));


    useEffect(() => {
        if (localStorage.getItem("User") === null) {
            const data = {
                userid: null,
                isAdmin: false,
                login: false,
            }
            localStorage.setItem("User", JSON.stringify(data));
        }
        if (localStorage.getItem("User")) {
            const data = JSON.parse(localStorage.getItem("User"));
            setIsAdmin(data.isAdmin);
            setIsLogin(data.login);
        }
    }, [user]);

    return (
        <>
            {/*<Routes>*/}
            {/*    <Route path="/" element={<Home/>}/>*/}
            {/*    <Route path="/Login" element={<Login/>}/>*/}
            {/*    <Route path="/SignUp" element={<SignUp/>}/>*/}
            {/*</Routes>*/}


            {
                (isLogin === null && isAdmin === null) ? "" :
                    isLogin ?
                        isAdmin ?
                            <Routes>
                                <Route path="/Admin" element={<Admin/>}/>
                                <Route path="*" element={<Error/>}/>
                            </Routes>
                            :
                            <Routes>
                                <Route path="/User" element={<User/>}/>
                                <Route path="*" element={<Error/>}/>
                            </Routes>
                        :
                        <Routes>
                            <Route path="/" element={<SignUp/>}/>
                            <Route path="/Login" element={<Login/>}/>
                            <Route path="/NotUser" element={<NotloginUser/>}/>
                            <Route path="*" element={<Error/>}/>
                        </Routes>
            }

            {/*<Form/>*/}

        </>
    );
};

export default App;
