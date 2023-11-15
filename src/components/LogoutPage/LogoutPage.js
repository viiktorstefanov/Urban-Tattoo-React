import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function LogoutPage() {
    const { onLogout } = useContext(AuthContext);
    useEffect(() => {
         onLogout() 
    }, []);

    return <Navigate to='/'/>
};

