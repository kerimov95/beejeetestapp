import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { history } from './history';
import Reducer from './reducers';

export const store = createStore(Reducer, compose(applyMiddleware(thunk, routerMiddleware(history))));
