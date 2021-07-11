import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { authReducer } from './auth';
import { taskReducer } from './task';
import { notificationReducer } from './notification';
import { history } from '../history';

export default combineReducers({
    router: connectRouter(history),
    authReducer,
    taskReducer,
    notificationReducer
})
