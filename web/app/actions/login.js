import axios from 'axios';
import AuthService from '../services/AutheticationService.js';
import {
    LOGIN,
    LOGOUT,
} from '../constants/types';
import {
    successNotification,
    errorNotification,
} from './notification';


export function login(username, password) {
    return dispatch => {
        dispatch({ type: LOGIN.LOGIN_REQUEST, username });

        AuthService.login(username, password)
            .then(
                data => {
                    successNotification('Welcome!');
                    axios.defaults.headers.common.Authorization = 'true';
                    dispatch({type: LOGIN.LOGIN_SUCCESS, data});
                },
                error => {
                    dispatch({ type: LOGIN.LOGIN_FAILURE, data: error.response.data  });
                    dispatch(errorNotification(error.response.data));
                }
            );
    };
}

export function logout() {
    return (dispatch) => {
        AuthService.logout();
        dispatch({ type: LOGOUT });
    };
}
