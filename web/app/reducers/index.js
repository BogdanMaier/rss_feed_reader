import { combineReducers } from 'redux';
import auth from './loginReducer';
import data from './dataReducer';
import notification from './notificationsReducer';


export default combineReducers({
    auth,
    notification,
    data,
});
