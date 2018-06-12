import React from 'react';
import 'core-js/fn/array/find';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { configureStore, history } from './stores/configureStore';
import Root from './containers/Root';
import { KEY_USER } from './constants/config';
import { LOGIN } from './constants/types';
import { login } from './actions';

// Polyfiells
import 'core-js/fn/array/find';

const store = configureStore({});

render(
    <AppContainer>
        <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById('root')
);


