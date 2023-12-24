import { List } from "devextreme-react/list";
import { useEffect, useState } from "react";
import { TodoModel } from "../models/todo-model";
import axios from "axios";
import './todo-list.css'

export const TodoList = () => {
    const [todos, setTodos] = useState<TodoModel[]>([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get(
                process.env.NODE_ENV !== 'production'
                    ? 'http://localhost:8000/todos'
                    : 'https://fast-api-test-8znp.onrender.com/todos'
            );
            const todos = response.data;

            setTodos(todos);
        })();   
    }, []);

    return (
        <List dataSource={todos} itemRender={(todo: TodoModel) => {
            return (
                <div className="todo-container">
                    <div className="todo">{todo.id}</div>
                    <div className="todo">{todo.description}</div>
                    <div>{todo.status}</div>
                </div>
            )
        }} />
    );
}