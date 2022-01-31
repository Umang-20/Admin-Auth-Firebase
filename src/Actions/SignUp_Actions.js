import auth from "../firebase";

const SignUp_Started = () =>{
    return{
        type:"SignUp_Started",
        payload:{
            loading: true,
            login: false,
            isSignUp: false,
            error:"",
        }
    }
}

const SignUp_Success =() =>{
    return{
        type:"SignUp_Success",
        payload: {
            loading: false,
            login: true,
            isSignUp: true,
            error: "",
        }
    }
}

const SignUp_Fail = (error) =>{
    return{
        type:"SignUp_Fail",
        payload:{
            error,
            loading: false,
            login:false,
            isSignUp: false,
        }
    }
}

const SignUp_Navigate = ()=>{
    return{
        type:"SignUp_Navigate",
        payload:{
            isSignUp:false,
        }
    }
}



const SignUp_Initialize = (email,password) =>{
    return async function (dispach) {
        dispach(SignUp_Started());
        auth.createUserWithEmailAndPassword(email,password).then(()=>{
                dispach(SignUp_Success());
                dispach(SignUp_Navigate());
            }).catch((error)=>dispach(SignUp_Fail(error.message)))
    }
}

export default SignUp_Initialize;