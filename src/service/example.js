import { requester } from "../request.js";

const request = requester();

const endpoints = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',
}

async function login(values) {
    return request.post(endpoints.login, values);
}
async function register(values) {
    return request.post(endpoints.register, values);
}
async function logout(token) {
    return request.get(endpoints.logout, null, token);
}

export default {
    login,
    register,
    logout
}