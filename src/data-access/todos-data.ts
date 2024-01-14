import { AppConsts } from "../app-consts";
import { TodoModel } from "../models/todo-model";
import { notifyWrapper } from "./helpers";
import { httpClient } from "./http-client";


export const getTodoListAsync = async () => {
    const token = '';

    return await notifyWrapper<TodoModel[]>(async () => {
        const response = await httpClient.request({
            url: `${AppConsts.webApiRoutes.todos}`,
            method: 'GET',
            headers: {'Authorization': `Bearer ${token}`}
        });

        if (response.status === 200) {
            const todos = response.data;

            return todos as TodoModel[];
        }
    })
};

export const postTodoAsync = async (todo: TodoModel) => {
    return await notifyWrapper<TodoModel>(async () => {
        const response = await httpClient.request({
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
        const response = await httpClient.request({
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
        const response = await httpClient.request({
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