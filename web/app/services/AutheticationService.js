import axios from 'axios';
import { API_HOST, KEY_USER } from '../constants/config.js';
import { handleResponse } from './Utils';

class AuthenticationService {
    login(username, password) {
        return axios({
            method: 'POST',
            url: API_HOST + 'api/login',
            headers: {'Content-Type': 'application/json'},
            data: { email: username, password },
        })
            .then(handleResponse)
            .then(res => {
                if (res && res.data) {
                    localStorage.setItem(KEY_USER, res.data.user.email);
                }
                return res.data;
            });
    }

    logout() {
        localStorage.removeItem(KEY_USER);
    }

    resetPassword(email) {
        return axios({
            method: 'POST',
            baseURL: API_HOST + 'api/request',
            headers: { 'Content-Type': 'application/json' },
            data: { email },
        }).then(handleResponse);
    }
}

export default new AuthenticationService();
