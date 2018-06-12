import { Map } from 'immutable';
import { NOTIFICATION } from '../constants/types';

const initalState = Map({
    id: null,
    type: null,
    message: null,
});

export default (state = initalState, action) => {
    switch (action.type) {
        case NOTIFICATION.NOTIFICATION_SUCCESS:
            return state
                .set('id', (new Date()).getTime())
                .set('type', 'success')
                .set('message', action.data);
        case NOTIFICATION.NOTIFICATION_ERROR:
            return state
                .set('id', (new Date()).getTime())
                .set('type', 'danger')
                .set('message', action.data.message || action.data);
        // case NOTIFICATION.CLEAR:
        //     return {};
        default:
            return state;
    }
};

