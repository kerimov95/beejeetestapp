import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'components/app';
import { Provider } from 'react-redux';
import { store } from 'store';
import { authActions } from 'store/actions';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'store/history';

if (localStorage.getItem('token')) {
    store.dispatch(authActions.signin());
}

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>, document.getElementById('root'));
