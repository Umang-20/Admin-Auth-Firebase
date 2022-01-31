const defaultValue = {
    payload: {
        userid: null,
        loading: false,
        login: false,
        error: null,
        isSignUp: false,
        isAdmin: false,
    }
}

const userReducer = (State = defaultValue, action) => {
    switch (action.type) {
        case "Login_Started":
            return {
                ...State,
                payload: {
                    ...State.payload,
                    loading: action.payload.loading,
                    login: action.payload.login,
                    error: action.payload.error,
                }
            }
        case "SignUp_Started":
        case "SignOut_Started":
            return {
                ...State,
                payload: {
                    ...State.payload,
                    loading: action.payload.loading,
                    login: action.payload.login,
                    isSignUp: action.payload.isSignUp,
                    error: action.payload.error,
                }
            }
        case "Login_Success":
            return {
                ...State,
                payload: {
                    ...State.payload,
                    loading: action.payload.loading,
                    userid: action.payload.userid,
                    login: action.payload.login,
                    error: action.payload.error,
                }
            }
        case "SignUp_Success":
            return {
                ...State,
                payload: {
                    ...State.payload,
                    loading: action.payload.loading,
                    isSignUp: action.payload.isSignUp,
                    error: action.payload.error,
                }
            }
        case "SignOut_Success":
            localStorage.clear();
            const sodata = {
                userid: null,
                isAdmin: false,
                login: false,
            }
            localStorage.setItem("User", JSON.stringify(sodata));
            return defaultValue;

        case "Login_Fail":
            return {
                ...State,
                payload: {
                    ...State.payload,
                    loading: action.payload.loading,
                    error: action.payload.error,
                    login: action.payload.login,
                }
            }
        case "SignUp_Fail":
        case "SignOut_Fail":
            return {
                ...State,
                payload: {
                    ...State.payload,
                    loading: action.payload.loading,
                    error: action.payload.error,
                    login: action.payload.login,
                    isSignUp: action.payload.isSignUp,
                }
            }
        case "SignUp_Navigate":
            return {
                ...State,
                payload: {
                    ...State.payload,
                    isSignUp: action.payload.isSignUp,
                }
            }
        case "Reset_Error":
            return {
                ...State,
                payload: {
                    ...State.payload,
                    error: action.payload.error,
                }
            }
        case "Admin":
        case "User":
            const data = {
                userid: State.payload.userid,
                isAdmin: action.payload.isAdmin,
                login: State.payload.login,
            }
            localStorage.setItem("User", JSON.stringify(data));
            return {
                ...State,
                payload: {
                    ...State.payload,
                    isAdmin: action.payload.isAdmin,
                    loading: action.payload.loading,
                    login: action.payload.login,
                }
            }
        case "CheckUser":
            return {
                ...State,
                payload: {
                    ...State.payload,
                    userid: action.payload.userid,
                    isAdmin: action.payload.isAdmin,
                    login: action.payload.login,
                }
            }
        default:
            return State;
    }
}

export default userReducer;