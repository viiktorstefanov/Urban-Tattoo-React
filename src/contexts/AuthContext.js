import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { login, register, userLogout, userEdit, userDelete, userUpdateReservations } from "../service/authService";
import useLocalStorage from "../hooks/useLocalStorage";
import notification from "../service/notification";
import { useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useLocalStorage('userData', false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isDeleteSubmit, setIsDeleteSubmit] = useState(false);
    const navigate = useNavigate();

    //user login handler
    const onLoginSubmit = async (data) => {
        try {
            setIsSubmit(true);
            const result = await login(data);
            notification.success('Login Successful', 3000);
            setUser(result);
            navigate('/')
        } catch (e) {
            if (e.status === 403) {
                return notification.error('Invalid email or password', 3000);
            }
            notification.error(e.message, 3000);
        } finally {
            setIsSubmit(false);
        }
    };
    
    //user register handler
    const onRegisterSubmit = async (data) => {
        const { repeatPassword, ...registerData } = data;
        // if (repeatPassword !== registerData.password) {
        //     return;
        // }

        try {
            setIsSubmit(true);
            const result = await register(registerData);
            notification.success('Registration successful', 3000);
            setUser(result);
            navigate('/')
        } catch (e) {
            if(e.message.length > 0) {
                e.message.map(e => notification.error(e, 3000));
            }
            notification.error(e.message, 3000);
        } finally {
            setIsSubmit(false);
        }

    };

    //user logout handler
    const onLogout = async () => {
        try {
            setIsSubmit(true);
            notification.loading('Please wait');
            await userLogout(user);
            setUser(false);
            notification.update('Logout successful');
            navigate('/');
        } catch (e) {
            notification.update(e.message, 3000, 'error');
        } finally {
            setIsSubmit(false);
        }
    };

    //edit user handler
    const onEditSubmit = async (data) => {
        try {
            setIsSubmit(true);
            const result = await userEdit(data, user);
            setUser(result);
            notification.success('Profile edited', 3000);
            navigate(`/profile/${user._id}`);
        } catch (e) {
            notification.error(e.message, 3000);
        } finally {
            setIsSubmit(false);
        }
    };

    //delete user handler
    const onDelete = async () => {
        try {
            setIsSubmit(false);
            setIsDeleteSubmit(true);
            await userDelete(user);
            setUser(false);
            notification.success('Your profile was deleted', 3000);
            navigate('/');
        } catch (e) {
            notification.error(e.message, 3000);
        } finally {
            setIsDeleteSubmit(false);
        }
    };

    //add user reservation
    const updateUserReservations = async (data) => {
        try {
            setIsSubmit(true);
            notification.loading('Please wait');
            const result = await userUpdateReservations(user._id, data, user);
            setUser(result);
            notification.update('Reservation confirmed');
            navigate(`/profile/${user._id}`);
        } catch (e) {
            notification.update(e.message, 3000, 'error');
        } finally {
            setIsSubmit(false);
        }
    };

    const clearUser = () => setUser(false);

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
        isSubmit,
        isDeleteSubmit,
        clearUser
    };

    return (
        <>
            <AuthContext.Provider value={AuthorizationValues}>
                {children}
            </AuthContext.Provider>
        </>
    );
};