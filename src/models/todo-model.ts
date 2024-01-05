import { TodoStatuses } from "./todo-statuses";

export type TodoModel = {
    id: number;
    title: string;
    description?: string;
    date: Date;
    status: TodoStatuses;
}