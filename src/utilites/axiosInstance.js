import axios from "axios";
import { BATCH_URL } from "./Utilites";
import Cookies from 'js-cookie';
import { logout } from "../reduct/slice/auth.slice";

const axiosInstance = axios.create({
    baseURL: BATCH_URL,
    withCredentials: true
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('accrestoken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const response = await axios.post(BATCH_URL + 'users/get-newtoken', {}, { withCredentials: true })
                
                console.log("axiosInstance generateNewTokens", response);
                
                if (response.status === 200) {
                    const { accrestoken } = response.data;
                    originalRequest.headers['Authorization'] = `Bearer ${accrestoken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                const { store } = require('../reduct/Store').configestore();
                const _id = localStorage.getItem("_id");
                store.dispatch(logout(_id));
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);


export default axiosInstance;