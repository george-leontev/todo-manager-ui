import axios from "axios";
import { AppConsts } from "../app-consts";
import { TodoModel } from "../models/todo-model";
import { notifyWrapper } from "./helpers";


export const getTodoListAsync = async () => {
    return await notifyWrapper<TodoModel[]>(async () => {
        const response = await axios.request({
            url: `${AppConsts.webApiRoutes.todos}`,
            method: 'GET'
        });

        if (response.status === 200) {
            const todos = response.data;

            return todos as TodoModel[];
        }
    })
};

export const postTodoAsync = async (todo: TodoModel) => {
    return await notifyWrapper<TodoModel>(async () => {
        const response = await axios.request({
            url: `${AppConsts.webApiRoutes.todos}`,
            method: 'POST',
            data: todo
        });

        if (response.status === 200) {
            const todo = response.data;

            return todo as TodoModel;
        }
    });
}

export const deleteTodoAsync = async (todo: TodoModel) => {

    return await notifyWrapper<TodoModel>(async () => {
        const response = await axios.request({
            url: `${AppConsts.webApiRoutes.todos}/${todo.id}`,
            method: 'DELETE'
        });
        if (response.status === 200) {
            const deletedTodo = response.data;

            return deletedTodo as TodoModel;
        }
    })
};


export const putTodoAsync = async (todo: TodoModel) => {

    return await notifyWrapper<TodoModel>(async () => {
        const response = await axios.request({
            url: `${AppConsts.webApiRoutes.todos}`,
            method: 'PUT',
            data: todo
        })

        if (response.status === 200) {
            const todo = response.data;

            return todo as TodoModel;
        }
    })
}