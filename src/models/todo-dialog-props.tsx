import { Proc } from "./common-types";
import { TodoModel } from "./todo-model";

export enum TodoDialogMode {
    create,
    edit
}

export type TodoDialogProps = {
    onHidden?: Proc;
    callback?: (todo: TodoModel) => void;
    editedTodo?: TodoModel;
}