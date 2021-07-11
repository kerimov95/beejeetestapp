import { Action, Notification } from 'types';
import { notificationTypes } from '../actions/actionstypes';

const initCintext: Notification[] = []

function notificationReducer(state = initCintext, action: Action<Notification>) {
    switch (action.type) {
        case notificationTypes.addNotification:
            state.unshift(action.payload)
            return [...state];
        case notificationTypes.removeNotification:
            const newState = state.filter(item => item.id !== action.payload.id)
            return [...newState];
        default:
            return state
    }
}

export { notificationReducer }
