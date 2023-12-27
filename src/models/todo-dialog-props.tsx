import { TodoModel } from "./todo-model";

export type TodoDialogProps = {
    onHidden?: () => void;
    callback?: (todo: TodoModel) => void;
}