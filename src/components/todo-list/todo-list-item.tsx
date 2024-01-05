import { Button } from "devextreme-react/button";
import { AdditionalMenuIcon, TaskIcon, CalendarIcon } from "../../app-icons";
import { TodoListItemProps } from "../../models/todo-list-item-props";

export const TodoListItem = ({ todo, onContextMenu }: TodoListItemProps) => {
    return (
        <div className="todo-item">
            <div className="todo-icon todo-icon-main">
                <TaskIcon className="app-icon" size={22} />
            </div>

            <div className="title-description-container">
                <div className="app-text todo-title">{todo.title}</div>
                <div className="todo-description">{todo.description}</div>
                <div className="todo-date">
                    <Button className="app-command-button app-command-button-small"  style={{border: '1px solid grey'}} >
                        <CalendarIcon />
                    </Button>

                    <div className="todo-date-apointment">{todo.date.toLocaleString('ru-RU', {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                    })}</div>
                </div>

            </div>

            <div className="todo-command-button">
                <Button className="app-command-button" onClick={(e) => {
                    if (onContextMenu) {
                        onContextMenu(e.element);
                    }
                }}>
                    <AdditionalMenuIcon className="app-icon" size={22} />
                </Button>
            </div>

        </div>
    );
}