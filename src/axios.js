import axios from 'axios';
import store from './store';
import { logout } from './actions/actionCreators';


const client = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

client.interceptors.request.use(function (config) {
    const { token } = store.getState().auth.list;

    if (token !== null) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, function (error) {
    return Promise.reject(error);
});

client.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    
    if (error && error.response.status === 401) {
        logout()(store.dispatch)
    }

    return Promise.reject(error);
});


export default client;