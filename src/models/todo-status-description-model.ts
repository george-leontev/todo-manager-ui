import { TodoStatuses } from "./todo-statuses";

export type TodoStatusDescriptionModel = {
    id: TodoStatuses;
    description: string;
}

export const TodoStatusDescriptions: TodoStatusDescriptionModel[] = [
    {
        id: TodoStatuses.Pending,
        description: 'Pending'
    },
    {
        id: TodoStatuses.Done,
        description: 'Done'
    }
]