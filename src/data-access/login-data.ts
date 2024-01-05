import { AppConsts } from "../app-consts";
import { LoginModel } from "../models/login-model";
import { notifyWrapper } from "./helpers";
import { httpClient } from "./http-client";

export const signInAsync = async (login: LoginModel) => {

    return await notifyWrapper<LoginModel>(async () => {
        const response = await httpClient.request({
            url: `${AppConsts.webApiRoutes.signIn}`,
            method: 'POST',
            data: login
        });
        if (response.status === 200) {
            const accessToken = response.data;

            return accessToken as LoginModel;
        }
    });
};