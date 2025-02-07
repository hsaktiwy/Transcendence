import axios from 'axios';
import Cookies from 'js-cookie';
// import { axiosPath } from './Constants';

const mailman = axios.create(
    {
        baseURL: import.meta.env.VITE_axiosPath,
        withCredentials: true
    }
);

// Request Interceptor
mailman.interceptors.request.use(
    (config) => {
        if (!config.headers['Content-Type'])
            config.headers['Content-Type'] = 'application/json';
        const csrfToken = Cookies.get('csrftoken');
        if (csrfToken)
            config.headers['X-CSRFToken'] = csrfToken;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

mailman.interceptors.response.use(
    (response) =>{
        if(response.headers['csrf_token'])
            localStorage.setItem("csrf_token", response.headers['csrf_token'])
        return response
    },
    async (error) =>{
        const originalRequest = error.config
        if ((error.response.config.responseType==='blob' || (error.response  && error.response.data['detail'] && error.response.data['detail'] == 'Expired token')) && (error.response.status == 401 && !originalRequest._retry)){
            originalRequest._retry = true
                
            try{
                const req:string = import.meta.env.VITE_axiosPath+"/api/user/refresh_token/"
                await axios.get(req, {
                    withCredentials: true,
                })
                return mailman(originalRequest);
            }
            catch (refresh_token_error){
                console.log(refresh_token_error)
                return Promise.reject(refresh_token_error)

            }
        }
        return Promise.reject(error)
    }
)

export default mailman;
