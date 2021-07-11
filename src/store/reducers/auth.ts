import { Action } from 'types';
import { authActionsTypes } from '../actions/actionstypes';

const initCintext = { isAuthenticated: false }

function authReducer(state = initCintext, action: Action) {
    switch (action.type) {
        case authActionsTypes.signin:
            return { isAuthenticated: true }
        case authActionsTypes.signout:
            localStorage.removeItem('token');
            return { isAuthenticated: false }
        default:
            return state
    }
}

export { authReducer }
