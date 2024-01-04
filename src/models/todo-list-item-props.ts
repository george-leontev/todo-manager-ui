import { TodoModel } from "./todo-model";

export type TodoListItemProps = {
    todo: TodoModel;
    onContextMenu?: (target: HTMLElement) => void;
}