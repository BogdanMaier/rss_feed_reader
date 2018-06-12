import {
    NOTIFICATION as N,
} from '../constants/types';

export function successNotification(data) {
    return {
        type: N.NOTIFICATION_SUCCESS,
        data,
    };
}

export function errorNotification(data) {
    return (dispatch) => {
        dispatch({
            type: N.NOTIFICATION_ERROR,
            data,
        });
    };
}

export function clearNotification() {
    return {type: N.NOTIFICATION_CLEAR};
}
