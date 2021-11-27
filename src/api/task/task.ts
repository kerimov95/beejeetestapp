import { TasksContext } from 'store/reducers/task';
import { TaskStatus } from 'types';
import { baseUrl, user } from '../const';

type QueryParams = Pick<TasksContext, 'page' | 'sort_direction' | 'sort_field'>;

export const getTasks = async (options: QueryParams) => {
    try {

        const query = Object.entries(options);

        const queryString = query.reduce((prev: any, current: any) => {
            return prev + `&${current[0]}=${current[1]}`
        }, '')

        const request = new Request(`${baseUrl('')}${queryString}`);
        const response = await fetch(request);
        const tasks = await response.json()

        if (tasks.status === 'ok') {
            return Promise.resolve(tasks.message)
        }
        else {
            return Promise.reject()
        }
    }
    catch {
        throw Error('Error')
    }

}

export const createTask = async (email: string, text: string) => {
    try {

        const newTask = {
            email,
            text,
            username: user
        }
        const form = new FormData();

        const keys = Object.entries(newTask);

        keys.forEach(key => {
            form.append(key[0], key[1]);
        });

        const response = await fetch(baseUrl('create'), {
            method: 'POST',
            body: form
        });

        const result = await response.json();

        if (result.status === 'ok') {
            return Promise.resolve(result.message);
        }
        else {
            return Promise.reject();
        }
    }
    catch {
        throw Error('Error')
    }

}

export const taskUpdate = async (id: number, options: { text?: string, status?: TaskStatus }) => {

    try {

        const token = localStorage.getItem('token');

        if (!token) {
            return Promise.reject({ status: 401 });
        }

        const form = new FormData();

        const keys = Object.entries(options);
        keys.forEach(key => {
            form.append(key[0], key[1].toString());
        })

        form.append('token', token)

        const response = await fetch(baseUrl(`edit/${id}`), {
            method: 'POST',
            body: form
        });

        const result = await response.json();

        if (result.status === 'ok') {
            return Promise.resolve();
        }
        else {
            return Promise.reject();
        }
    }
    catch {
        throw Error('Error')
    }
}
