import { get, post, del, put } from './request';

const endpoints = {
    register: 'users/register',
    login: 'users/login',
    logout: 'users/logout',
    edit: 'users/edit/',
    delete: 'users/',
    reservations: 'users/reservations/',
};

const login = async (data) => await post(endpoints.login, data);

const register = async (data) => await post(endpoints.register, data);

const userLogout = async (user) => await get(endpoints.logout,null, user);

const userEdit = async (data, user) => await put(endpoints.edit + user._id, data, user);

const userDelete = async (user) => await del(endpoints.delete + user._id, null, user);

const userUpdateReservations = async (id, reservation, user) => await put(endpoints.reservations + id, reservation, user);

const getAllUserReservations = async () => await get(endpoints.reservations);

export {
    login,
    register,
    userLogout,
    userEdit,
    userDelete,
    userUpdateReservations,
    getAllUserReservations,
}
