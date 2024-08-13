import axios from "axios";
import { BATCH_URL } from "./Utilites";
import Cookies from 'js-cookie';


const axiosInstance = axios.create({
    baseURL: BATCH_URL,
    withCredentials:true
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token =  Cookies.get('accrestoken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)



export default axiosInstance;