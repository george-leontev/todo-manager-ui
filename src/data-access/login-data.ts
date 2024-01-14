import { AppConsts } from "../app-consts";
import { AuthUserModel } from "../models/auth-user-model";
import { LoginModel } from "../models/login-model";
import { notifyWrapper } from "./helpers";
import { httpClient } from "./http-client";

export const signInAsync = async (login: LoginModel) => {

    return await notifyWrapper<AuthUserModel>(async () => {
        const response = await httpClient.request({
            url: `${AppConsts.webApiRoutes.signIn}`,
            method: 'POST',
            data: login
        });
        if (response.status === 200) {
            const authUser = response.data;

            return authUser as AuthUserModel;
        }
    });
};