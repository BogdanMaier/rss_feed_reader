import { Map } from 'immutable';
import {
    LOGIN,
    LOGOUT,
} from '../constants/types';

const initalState = Map({
    authenticating: false,
    authenticated: false,
    error: null,
    user: null,
});

export default (state = initalState, action) => {
    switch (action.type) {
        case LOGIN.LOGIN_REQUEST:
            return state.merge({
                authenticating: true,
            });
        case LOGIN.LOGIN_SUCCESS:
            return state.merge({
                authenticating: false,
                authenticated: true,
                error: null,
                user: action.data.user,
            });
        case LOGIN.LOGIN_FAILURE:
            return state.merge({
                authenticating: false,
                authenticated: false,
                error: action.error,
                user: null,
            });
        case LOGOUT:
            return state.merge({
                authenticating: false,
                authenticated: false,
                error: null,
                user: null,
            });
        default:
            return state;
    }
};
