import axios from 'axios';


const axiosClient = axios.create({
baseURL: 'https://clutchden.onrender.com',
});


axiosClient.interceptors.request.use((config) => {
const token = localStorage.getItem('token');
if (token) config.headers.Authorization = token;
return config;
});


export default axiosClient;