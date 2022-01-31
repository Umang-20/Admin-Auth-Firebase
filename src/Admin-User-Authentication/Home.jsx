import React from 'react';
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <>
            <div className="main">
                <center><h1>This is home Page.</h1></center>
            </div>
            <Link to={"/Login"}>Login</Link>
            <Link to={"/SignUp"}>SignUp</Link>
        </>
    );
};

export default Home;
