import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function LogoutPage() {

    useEffect(() => {
        //listen for onLogout();
    },[]);

    return <Navigate to='/'/>
};

