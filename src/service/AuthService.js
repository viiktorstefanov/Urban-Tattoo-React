import { get, post, del, put } from './request';

const endpoints = {
    register: '/users/register',
    login: '/users/login',
    logout: '/users/logout',
    edit: '/users/edit/',
    delete: '/users/'
};

const login = async (data) => await post(endpoints.login, data);

const register = async (data) => await post(endpoints.register, data);

const userLogout = async (token) => await get(endpoints.logout, token);

const userEdit = async (data, userId) => await put(endpoints.edit + userId, data);

const userDelete = async (userId) => await del(endpoints.delete + userId);

export {
    login,
    register,
    userLogout,
    userEdit,
    userDelete,
}