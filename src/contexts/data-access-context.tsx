import { createContext, useCallback, useContext } from "react";
import { AppConsts } from "../app-consts";
import { httpClient } from "../data-access/http-client";
import { AuthUserModel } from "../models/auth-user-model";
import { TodoModel } from "../models/todo-model";
import { useAuth } from "./auth-сontext";
import { useNavigate } from "react-router";
import { AxiosError, AxiosRequestConfig } from "axios";
import notify from "devextreme/ui/notify";
import { formatMessage } from "devextreme/localization";

export type DataAccessModel = {
    getTodoListAsync: () => Promise<TodoModel[] | undefined>;
    postTodoAsync: (todo: TodoModel) => Promise<TodoModel | undefined>;
    deleteTodoAsync: (todo: TodoModel) => Promise<TodoModel | undefined>;
    putTodoAsync: (todo: TodoModel) => Promise<TodoModel | undefined>;
    confirmRegistrationAsync: (ticket: string) => Promise<boolean>;
}

const DataAccessContext = createContext({} as DataAccessModel)

function DataAccessProvider(props: any) {
    const { signOutAsync } = useAuth();
    const navigate = useNavigate();

    const authHttpRequest = useCallback(async (config: AxiosRequestConfig<any>) => {
        const authUserJson = localStorage.getItem('@authUser');
        let user: AuthUserModel | undefined = undefined;

        if (authUserJson) {
            user = JSON.parse(authUserJson);
        }

        try {
            const response = await httpClient.request({
                ...config,
                headers: {
                    ...config.headers,
                    'Authorization': `Bearer ${user?.token}`
                }
            });

            if (response.status === 200) {
                return response;
            }
        } catch (error) {
            const err = error as AxiosError;

            notify({
                message: formatMessage('httpErrorMessage', err.message),
                type: 'error',
                displayTime: 5000
            });

            if (err.response && err.response.status === 401) {
                await signOutAsync();
                navigate('/login');
            }
        }
    }, [navigate, signOutAsync]);

    const getTodoListAsync = useCallback(async () => {
        const response = await authHttpRequest({
            url: `${AppConsts.webApiRoutes.todos}`,
            method: 'GET',
        });

        if (response?.status === 200) {
            const todos = response.data;

            return todos as TodoModel[];
        }
    }, [authHttpRequest]);

    const postTodoAsync = useCallback(async (todo: TodoModel) => {
        const response = await authHttpRequest({
            url: `${AppConsts.webApiRoutes.todos}`,
            method: 'POST',
            data: todo,
        });

        if (response?.status === 200) {
            const todo = response.data;

            return todo as TodoModel;
        }
    }, [authHttpRequest]);

    const deleteTodoAsync = useCallback(async (todo: TodoModel) => {
        const response = await authHttpRequest({
            url: `${AppConsts.webApiRoutes.todos}/${todo.id}`,
            method: 'DELETE',
        });
        if (response?.status === 200) {
            const deletedTodo = response.data;

            return deletedTodo as TodoModel;
        }
    }, [authHttpRequest]);

    const putTodoAsync = useCallback(async (todo: TodoModel) => {
        const response = await authHttpRequest({
            url: `${AppConsts.webApiRoutes.todos}`,
            method: 'PUT',
            data: todo
        })

        if (response?.status === 200) {
            const todo = response.data;

            return todo as TodoModel;
        }
    }, [authHttpRequest]);

    const confirmRegistrationAsync = useCallback(async (ticket: string) => {
        try {
            const response = await httpClient.request({
                method: 'POST',
                url: `${AppConsts.webApiRoutes.registration}/confirm?ticket=${ticket}`
            });
            return response.status === 200;
        } catch (error) {
            const err = error as AxiosError;
            if (err.response?.status === 403) {
                return false;
            }

            notify({
                message: formatMessage('httpErrorMessage', err.message),
                type: 'error',
                displayTime: 5000
            });

            return false;
        }

    }, []);

    return <DataAccessContext.Provider value={{ getTodoListAsync, postTodoAsync, deleteTodoAsync, putTodoAsync, confirmRegistrationAsync }} {...props} />
}

const useDataAccess = () => useContext(DataAccessContext);

export { useDataAccess, DataAccessProvider }
