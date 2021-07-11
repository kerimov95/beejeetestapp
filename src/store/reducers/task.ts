import { Action, TasksContext } from 'types';
import { taskActionsTypes } from '../actions/actionstypes';

const initState: TasksContext = {
    tasks: [],
    total_task_count: 0,
    page: 1,
    sort_field: 'id',
    sort_direction: 'asc'
}

function taskReducer(state: TasksContext = initState, action: Action<TasksContext>) {
    switch (action.type) {
        case taskActionsTypes.getTask:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

export { taskReducer, TasksContext }
