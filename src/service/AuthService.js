import axios from "axios";

const baseUrl = 'http://localhost:5000/users';
//change axios to custom requester
export const login = (data) => axios.post(`${baseUrl}/login`, data);
