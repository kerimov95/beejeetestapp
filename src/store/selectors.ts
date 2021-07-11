import { AppState } from './types'

export const authSelectot = (state: AppState) => state.authReducer;

export const taskSelectot = (state: AppState) => state.taskReducer;

export const notificationSelectot = (state: AppState) => state.notificationReducer;
