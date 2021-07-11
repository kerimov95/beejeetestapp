import { TaskStatus } from "types";

export const statuses = {
    0: 'задача не выполнена',
    1: 'задача не выполнена, отредактирована админом',
    10: 'задача выполнена',
    11: 'задача отредактирована админом и выполнена'
}

export const getStatus = (id: TaskStatus): string => {
    return statuses[id];
}
