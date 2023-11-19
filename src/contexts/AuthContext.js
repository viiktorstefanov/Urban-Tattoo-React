import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { login, register, userLogout, userEdit, userDelete, userUpdateReservations } from "../service/authService";
import useLocalStorage from "../hooks/useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useLocalStorage('userData', false);
    const navigate = useNavigate();

    //user login handler
    const onLoginSubmit = async (data) => {
        try {
            const result = await login(data);

            setUser(result);
            navigate('/')
        } catch (e) {
            console.log(e);
        }
    };
    //user register handler
    const onRegisterSubmit = async (data) => {
        const { repeatPassword, ...registerData } = data;
        if (repeatPassword !== registerData.password) {
            return;
        }

        try {
            const result = await register(registerData);

            setUser(result);

            navigate('/')
        } catch (e) {
            console.log(e);
        }

    };
    //user logout handler
    const onLogout = async () => {
        await userLogout(user);

        setUser(false);
        navigate('/');
    };
    //edit user handler
    const onEditSubmit = async (data) => {
        try {
            const result = await userEdit(data, user);
            setUser(result);
            navigate(`/profile/${user._id}`);
        } catch (e) {
            console.log(e);
        }
    };
    //delete user handler
    const onDelete = async () => {
        try {
            await userDelete(user);

            setUser(false);
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    };

    //add user reservation
    const updateUserReservations = async (data) => {
        try {
            const result = await userUpdateReservations(user._id, data, user);
            setUser(result);
            navigate(`/profile/${user._id}`);
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
        updateUserReservations,
        user,
    };

    return (
        <>
            <AuthContext.Provider value={AuthorizationValues}>
                {children}
            </AuthContext.Provider>
        </>
    );
};