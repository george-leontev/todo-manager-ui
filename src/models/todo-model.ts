import { TodoStatuses } from "./todo-statuses";

export type TodoModel = {
    id: number;
    description: string;
    date: Date;
    status: TodoStatuses;
}