const SignOut_Started = () =>{
    return{
        type:"SignOut_Started",
        payload:{
            loading: true,
            login: false,
            isSignUp: false,
            error:"",
        }
    }
}

const SignOut_Success =() =>{
    return{
        type:"SignOut_Success",
        payload: {
            loading: false,
            login: false,
            isSignUp: false,
            error: "",
        }
    }
}

const SignOut_Fail = (error) =>{
    return{
        type:"SignOut_Fail",
        payload:{
            error,
            loading: false,
            login:false,
            isSignUp: false,
        }
    }
}


const SignOut_Initialize = () =>{
    return async function (dispach) {
        dispach(SignOut_Started());
        try{
            setTimeout(()=>{
                dispach(SignOut_Success());
            },1000)
        }catch (e) {
            dispach(SignOut_Fail(e.message));
        }
    }
}

export default SignOut_Initialize;