import { KEY_USER } from '../constants/config';

export function requiresAuth(props) {
    const {
        history,
        location,
    } = props;
    const storedData = localStorage.getItem(KEY_USER);
    const isAuthed = storedData && storedData.length > 0;

    if (!isAuthed) {
        history.replace({
            pathname: '/login',
            state: {
                nextPathname: location.pathname
            }
        });
    }
    return null;
}
