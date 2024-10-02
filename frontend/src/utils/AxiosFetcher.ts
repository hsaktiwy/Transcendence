import axios from 'axios';
import Cookies from 'js-cookie';

const mailman = axios.create(
    {
        baseURL: 'http://localhost:8000',
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
        if (error.response && error.response.status == 401 && error.response.data['detail'] && error.response.data['detail'] == 'Expired token' && !originalRequest._retry){
            originalRequest._retry = true
            try{
                const refreshToken = await axios.get('http://localhost:8000/api/user/refresh_token/', {
                    withCredentials: true
                })
                return mailman(originalRequest);
            }
            catch (refresh_token_error){
                return Promise.reject(refresh_token_error)

            }
        }
        // return Promise.resolve(error.response);
        return Promise.reject(error)
    }
)

export default mailman;
