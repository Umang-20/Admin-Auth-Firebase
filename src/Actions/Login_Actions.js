import auth from "../firebase";
import axios from "axios";

const Login_Started = () =>{
    return{
        type:"Login_Started",
        payload:{
            loading: true,
            login:false,
        }
    }
}

const Login_Success =(userid) =>{
    return{
        type:"Login_Success",
        payload: {
            userid,
            loading: true,
            login: true,
            error: "",
        }
    }
}

const Admin = ()=>{
    return{
        type:"Admin",
        payload:{
            isAdmin:true,
            login: true,
            loading:false,
        }
    }
}

const User = () =>{
    return{
        type:"User",
        payload:{
            isAdmin:false,
            login: true,
            loading:false,
        }
    }
}

const Login_Fail = (error) =>{
    return{
        type:"Login_Fail",
        payload:{
            error,
            loading: false,
            login: false,
        }
    }
}


const Login_Initialize = (email,password) =>{
    return async function (dispach) {
        dispach(Login_Started());
        auth.signInWithEmailAndPassword(email,password).then(async ({user}) => {
            dispach(Login_Success(user.uid));
            const resp = await axios.get(`https://admin-user-authentication-default-rtdb.firebaseio.com/Admin.json`);

            let fetchData = [];
            for (let key in resp.data) {
                fetchData.push(
                    resp.data[key],
                );
            }
            if (fetchData.find((element) => element.userid === user.uid)) {
                // console.log("Admin");
                dispach(Admin());
            } else {
                // console.log("User");
                dispach(User());
            }
        }).catch((error)=>dispach(Login_Fail(error.message)))
    }
}

export default Login_Initialize;