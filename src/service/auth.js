import { clearUser, setUser } from '../services/util.js';
import { get, post } from './api.js';

const endpoints = {
  login: '/users/login',
  register: '/users/register',
  logout: '/users/logout',
};


export async function login(email, password) {
  const result = await post(endpoints.login, {
    email,
    password,
  });

  setUser(result);
}

export async function register(email, password, fullName, phone) {
  const result = await post(endpoints.register, {
    email,
    password,
    fullName,
    phone,
  });

  setUser(result);
}

export async function logout() {
 await get(endpoints.logout);
  clearUser();
}
