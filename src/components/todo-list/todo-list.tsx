import { List } from "devextreme-react/list";
import { TodoModel } from "../../models/todo-model";
import './todo-list.css'
import { EditIcon, RemoveIcon, TaskIcon } from "../../app-icons";
import Button from "devextreme-react/button";
import { TodoStatusDescriptions } from "../../models/todo-status-description-model";

export type TodoListProps = {
    items: TodoModel[];
    onDelete?: (todo: TodoModel) => void;
}

export const TodoList = ({ items, onDelete }: TodoListProps) => {

    return (
        <List height={500} width={'100%'} dataSource={items} itemRender={(todo: TodoModel) => {
            return (
                <div className="todo-item">
                    <div className="todo-icon">
                        <TaskIcon size={22} />
                    </div>
                    <div className="todo-description">{todo.description}</div>
                    <div className="todo-status">{TodoStatusDescriptions.find(d => d.id === todo.status)?.description}</div>
                    <div className="todo-icon">
                        <Button className="app-command-button" onClick={() => {
                            if (onDelete) {
                                onDelete(todo);
                            }
                        }}>
                            <RemoveIcon size={22} />
                        </Button>
                    </div>
                    <div className="todo-icon">
                        <Button className="app-command-button" onClick={() => {
                            alert('Hi');
                        }}>
                            <EditIcon size={22} />
                        </Button>
                    </div>
                </div>
            )
        }} />
    );
}