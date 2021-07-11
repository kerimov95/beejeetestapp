import { statuses } from "common/statuses";

export type Sort_field = 'id' | 'username' | 'email' | 'status';
export type Sort_direction = 'asc' | 'desc';

export type TaskStatus = keyof typeof statuses;

export type Action<T = any> = {
    type: string;
    payload?: T;
};

export type Task = {
    id: number;
    username: string;
    email: string;
    text: string;
    status: TaskStatus;
};

export type TasksContext = {
    tasks: Task[];
    total_task_count: number;
    page: number;
    sort_field: 'id' | 'username' | 'email' | 'status';
    sort_direction: 'asc' | 'desc';
}

export type NotificationType = 'negative' | 'positive' | 'warning'

export type Notification = {
    id: number;
    message: string;
    type: NotificationType;
}
