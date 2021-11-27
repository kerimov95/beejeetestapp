import { authActionsTypes, taskActionsTypes, notificationTypes } from './actionstypes';
import { getTasks, createTask, taskUpdate } from 'api/task';
import { push } from 'connected-react-router';
import { auth } from 'api/auth';
import { store } from 'store';
import { Dispatch } from 'react';
import { routeUrl } from 'common/urls';
import { t } from 'common/dictionary';
import {
    Action,
    NotificationType,
    Sort_direction,
    Sort_field,
    TaskStatus,
    Notification
} from 'types';


export const authActions = {
    signin: (): Action => ({ type: authActionsTypes.signin }),
    signout: (): Action => ({ type: authActionsTypes.signout }),

    signinAsync: (login: string, password: string) => async (dispatch: any) => {

        const form = new FormData();
        form.append('username', login);
        form.append('password', password);

        await auth(form)
            .then(() => {
                dispatch(authActions.signin());
                dispatch(push(routeUrl.homePage));
                dispatch(notificationActions.addNotificationAsync(t('successfulLogin'), 'positive'))
            })
            .catch(() => {
                dispatch(notificationActions.addNotificationAsync(t('unsuccessfulLogin'), 'negative'))
            });
    }
}

export const taskActions = {

    getTasksAsync: () => async (dispatch: Dispatch<any>) => {
        const context = store.getState().taskReducer;
        const tasks = await getTasks({ page: context.page, sort_field: context.sort_field, sort_direction: context.sort_direction });

        dispatch({ type: taskActionsTypes.getTask, payload: { ...context, ...tasks } });
    },

    createTaskAsync: (еmail: string, text: string) => async (dispatch: Dispatch<any>) => {
        const task = await createTask(еmail, text);

        dispatch(taskActions.getTasksAsync());
        dispatch(push(routeUrl.homePage));
        dispatch(notificationActions.addNotificationAsync(t('createTask'), 'positive'));
    },

    changePageAsync: (page: number) => async (dispatch: Dispatch<any>) => {
        const context = store.getState().taskReducer;

        dispatch({ type: taskActionsTypes.getTask, payload: { ...context, page } });
        dispatch(taskActions.getTasksAsync());
    },

    sortPageAsync: (sort_field: Sort_field) => async (dispatch: Dispatch<any>) => {
        const context = store.getState().taskReducer;

        let sort_direction: Sort_direction = context.sort_direction;

        if (context.sort_field === sort_field) {
            switch (context.sort_direction) {
                case 'asc':
                    sort_direction = 'desc'
                    break;
                case 'desc':
                    sort_direction = 'asc'
                    break;
            }
        }

        dispatch({ type: taskActionsTypes.getTask, payload: { ...context, sort_field, sort_direction } });
        dispatch(taskActions.getTasksAsync());
    },

    taskUpdateAsync: (id: number, options: { text?: string, status?: TaskStatus }) => async (dispatch: Dispatch<any>) => {
        taskUpdate(id, options).then(() => {
            dispatch(taskActions.getTasksAsync());
            dispatch(notificationActions.addNotificationAsync(t('updateTask'), 'warning'));
        }).catch(error => {
            dispatch(notificationActions.addNotificationAsync(t('errorEdit'), 'negative'));
            if (error.status === 401) {
                dispatch(push(routeUrl.loginPage));
            }
        });
    }
}

export const notificationActions = {
    addNotificationAsync: (
        message: string,
        type: NotificationType,
        timeout: number = 3000) => async (dispatch: Dispatch<any>) => {
            const notifications = store.getState().notificationReducer;
            const id = notifications.length > 0 ? Math.max(...notifications.map(item => item.id)) + 1 : 1;

            setTimeout(() => {
                dispatch(notificationActions.removeNotification(id));
            }, timeout)

            dispatch({ type: notificationTypes.addNotification, payload: { id, message, type } })
        },

    removeNotification: (id: number): Action<Notification> => {

        const notification = store.getState().notificationReducer.find(item => item.id === id);

        return { type: notificationTypes.removeNotification, payload: notification }
    }
}
