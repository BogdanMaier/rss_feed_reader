import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

export const history = createHistory();
const middleware = routerMiddleware(history);

const middleWare = [];

middleWare.push(thunkMiddleware);
middleWare.push(middleware);

if (process.env.NODE_ENV !== 'production') {
    middleWare.push(createLogger());
}

export function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        applyMiddleware(...middleWare),
    );

    return store;
}
