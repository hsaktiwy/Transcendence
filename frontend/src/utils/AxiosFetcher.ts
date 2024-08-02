import axios from 'axios';

const mailman = axios.create();

// Request Interceptor
mailman.interceptors.request.use(
    (config) => {
        // this code should be able to add our ACCESS_TOKEN  later in the project conult Hamza (chahboune or saktiwy)
        // const token = localStorage.getItem(ACCESS_TOKEN);
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default mailman;
