import React, { useState,useEffect } from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    logoutHandler: () => { },
    loginHandler: (email,password) => { }
});
export const AuthProviderContext = (props) => {
    const [loginStatus, setLoggedIn] = useState(false);
    useEffect(() => {
        const loginStatus = localStorage.getItem("loginStatus");
        if (loginStatus === "1") {
            setLoggedIn(true);
        }
    },[])
    const loginHandler = () => {
        localStorage.setItem("loginStatus","1");
        setLoggedIn(true)
    };
    const logoutHandler = () => {
        localStorage.removeItem("loginStatus");
        setLoggedIn(false)
    };
    return <AuthContext.Provider value={
        {
            loginHandler: loginHandler,
            logoutHandler: logoutHandler,
            isLoggedIn : loginStatus
        }
    }>{ props.children}</AuthContext.Provider>
}
export default AuthContext;
