import { TodoStatuses } from "./todo-statuses";

export type TodoModel = {
    id: string;
    title: string;
    description?: string;
    date: Date;
    status: TodoStatuses;
    userId: string;
}