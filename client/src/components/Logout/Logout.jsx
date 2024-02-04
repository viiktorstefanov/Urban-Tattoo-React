import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import notification from "../../service/notification";

export default function Logout() {
    const { onLogout } = useContext(AuthContext);
    
    useEffect(() => {
            onLogout()
            .catch((e) => {
                if (e.status !== 404) {
                    return notification.error(e.message, 3000);
                }
            });;
    }, [onLogout]);
    
    return <Navigate to='/'/>
};

