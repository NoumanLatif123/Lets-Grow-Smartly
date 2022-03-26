import api from './api';

export const setAuthToken = token => {
    if (token) {
        api.defaults.headers.common['auth-token'] = token;
    }
};