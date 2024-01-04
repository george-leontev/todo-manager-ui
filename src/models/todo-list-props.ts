import { TodoModel } from "./todo-model";

export type TodoListProps = {
    items: TodoModel[];
    onDelete?: (todo: TodoModel) => void;
    onEditing?: (todo: TodoModel) => void;
}