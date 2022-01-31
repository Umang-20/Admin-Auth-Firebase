const CheckUser = (data) =>{
    const {userid,isAdmin,login} = data;
    return{
        type:"CheckUser",
        payload:{
            userid,
            isAdmin,
            login,
        }
    }
}

export default CheckUser;