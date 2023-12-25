import { List } from "devextreme-react/list";
import { useEffect, useState } from "react";
import { TodoModel } from "../models/todo-model";
import axios from "axios";
import './todo-list.css'
import { RemoveIcon, TaskIcon } from "../app-icons";
import notify from 'devextreme/ui/notify';
import { AppConsts } from "../app-consts";
import Button from "devextreme-react/button";

export const TodoList = () => {
    const [todos, setTodos] = useState<TodoModel[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.request({
                    url: `${AppConsts.webApiRoutes.todos}`,
                    method: 'GET'
                });

                if (response.status === 200) {
                    const todos = response.data;

                    setTodos(todos);
                }
            } catch (error) {
                notify({
                    message: `В процессе выполнения запроса возникла ошибка: ${(error as Error).message}`,
                    type: 'error',
                    displayTime: 2000
                });
            }
        })();
    }, []);

    return (
        <List height={500} width={'100%'} dataSource={todos} itemRender={(todo: TodoModel) => {
            return (
                <div className="todo-item">
                    <div className="todo-icon">
                        <TaskIcon size={22} />
                    </div>
                    <div className="todo-description">{todo.description}</div>
                    <div className="todo-status">{todo.status}</div>
                    <div className="todo-icon">
                        <Button className="app-command-button" onClick={async () => {
                            const id = todo.id;
                            try {
                                const response = await axios.request({
                                    url: `${AppConsts.webApiRoutes.todos}/${id}`,
                                    method: 'DELETE'
                                });
                                if (response.status === 200) {
                                    const deletedTodo = response.data;
                                    setTodos((previous) => {
                                        return previous.filter((todo) => {
                                            return todo.id !== deletedTodo.id;
                                        });
                                    })
                                }
                            } catch (error) {
                                notify({
                                    message: `В процессе выполнения запроса возникла ошибка: ${(error as Error).message}`,
                                    type: 'error',
                                    displayTime: 2000
                                })
                            }
                        }}>
                            <RemoveIcon size={22} />
                        </Button>
                    </div>
                </div>
            )
        }} />
    );
}