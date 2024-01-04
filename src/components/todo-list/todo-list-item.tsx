import { Button } from "devextreme-react/button";
import { AdditionalMenuIcon, TaskIcon } from "../../app-icons";
import { TodoStatusDescriptions } from "../../models/todo-status-description-model";
import { TodoListItemProps } from "../../models/todo-list-item-props";

export const TodoListItem = ({ todo, onContextMenu }: TodoListItemProps) => {
    return (
        <div className="todo-item">
            <div className="todo-icon">
                <TaskIcon size={22} />
            </div>
            <div className="todo-description">{todo.description}</div>
            <div className="todo-status">{TodoStatusDescriptions.find(d => d.id === todo.status)?.description}</div>
            <div className="todo-icon">
                <Button className="app-command-button" onClick={(e) => {
                    if (onContextMenu) {
                        onContextMenu(e.element);
                    }
                }}>
                    <AdditionalMenuIcon size={22} />
                </Button>
            </div>

        </div>
    );
}