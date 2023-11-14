import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register, userLogout, userEdit, userDelete } from "../service/AuthService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [auth, setAuth ] = useState({});
    const [user, setUser ] = useState({});

    const onLoginSubmit = async (data) => {
        try {
            const result = await login(data);
            
            setAuth(result);
            navigate('/')
        } catch(e) {
            console.log(e);
        }
    };

    const onRegisterSubmit = async (data) => {
        const { confirmPasword, ...registerData } = data;
        if(confirmPasword !== registerData.password) {
            return;
        }

        try {
            const result = await register(registerData);

            setAuth(result);
            
            navigate('/')
        } catch(e) {
            console.log(e);
        }

    };

    const onLogout = async () => {
        await userLogout(user.accessToken);

        setAuth({});
    };

    const authorizationValues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        onEditSubmit,
        onDeleteSubmit,
        user,
    };





    return  (
    <>
        <AuthContext.Provider value={authorizationValues}>
            {children}
        </AuthContext.Provider>
    </>
    );
};