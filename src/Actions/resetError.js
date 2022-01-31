const resetError = () =>{
    return{
        type:"Reset_Error",
        payload:{
            error:"",
        }
    }
}

export default resetError;