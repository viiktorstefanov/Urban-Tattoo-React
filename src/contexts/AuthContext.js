import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { login, register, userLogout, userEdit, userDelete, userUpdateReservations } from "../service/authService";
import useLocalStorage from "../hooks/useLocalStorage";
import notification from "../service/notification";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useLocalStorage('userData', false);
    const navigate = useNavigate();

    //user login handler
    const onLoginSubmit = async (data) => {
        try {
            notification.loading('Please wait');
            const result = await login(data);
            setUser(result);
            navigate('/')
        } catch (e) {
            console.log(e);
        } finally {
            notification.update('Login Successful');
        }
    };
    
    //user register handler
    const onRegisterSubmit = async (data) => {
        const { repeatPassword, ...registerData } = data;
        if (repeatPassword !== registerData.password) {
            return;
        }

        try {
            notification.loading('Please wait');
            const result = await register(registerData);
            setUser(result);
            navigate('/')
        } catch (e) {
            console.log(e);
        } finally {
            notification.update('The registration ends successfully');
        }

    };

    //user logout handler
    const onLogout = async () => {
        try {
            notification.loading('Logging out');
            await userLogout(user);
            setUser(false);
            navigate('/');
        } catch (e) {
            console.log(e);
        } finally {
            notification.update('Logout successful');
         
        }
    };

    //edit user handler
    const onEditSubmit = async (data) => {
        try {
            notification.loading('Please wait');
            const result = await userEdit(data, user);
            setUser(result);
            navigate(`/profile/${user._id}`);
        } catch (e) {
            console.log(e);
        } finally {
            notification.update('Profile edited');
        }
    };

    //delete user handler
    const onDelete = async () => {
        try {
            notification.loading('Please wait');
            await userDelete(user);
            setUser(false);
            navigate('/');
        } catch (e) {
            console.log(e);
        } finally {
            notification.update('Your profile was deleted');
        }
    };

    //add user reservation
    const updateUserReservations = async (data) => {
        try {
            notification.loading('Please wait');
            const result = await userUpdateReservations(user._id, data, user);
            setUser(result);
            navigate(`/profile/${user._id}`);
        } catch (e) {
            console.log(e);
        } finally {
            notification.update('Reservation confirmed');
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
        isAuthenticated: !!user.accessToken,
        isAdmin: user._role === 'admin' ? true : false,
    };

    return (
        <>
            <AuthContext.Provider value={AuthorizationValues}>
                {children}
            </AuthContext.Provider>
        </>
    );
};