import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { login, register, userLogout, userEdit, userDelete } from "../service/AuthService";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    //useLocalStorage('userData')
    const [user, setUser ] = useLocalStorage('userData', {});
    const navigate = useNavigate();


    const onLoginSubmit = async (data) => {
        try {
            const result = await login(data);
            
            setUser(result);
            navigate('/')
        } catch(e) {
            console.log(e);
        }
    };

    const onRegisterSubmit = async (data) => {
        const { repeatPassword, ...registerData } = data;
        if(repeatPassword !== registerData.password) {
            return;
        }

        try {
            const result = await register(registerData);

            setUser(result);
            
            navigate('/')
        } catch(e) {
            console.log(e);
        }

    };

    const onLogout = async () => {
        await userLogout(user.accessToken);

        setUser(undefined);
    };

    const onEditSubmit = async (data) => {
        try {
            const result = await userEdit(data, user._id);
            console.log(result);
            navigate(`/users/${user._id}`);
        } catch(e) {
            console.log(e);
        }
    };

    const onDelete = async () => {
        try {
            const result = await userDelete(user._id);

            setUser(undefined);
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    };

    const AuthorizationValues = {
        onLoginSubmit,
        onRegisterSubmit,
        onLogout,
        onEditSubmit,
        onDelete,
        user,
    };





    return  (
    <>
        <AuthContext.Provider value={AuthorizationValues}>
            {children}
        </AuthContext.Provider>
    </>
    );
};