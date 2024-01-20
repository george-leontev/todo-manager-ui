import { Dispatch, SetStateAction, createContext, useCallback, useContext, useEffect, useState } from "react";
import { AuthUserModel } from "../models/auth-user-model";
import { httpClient } from "../data-access/http-client";
import { LoginModel } from "../models/login-model";
import { AppConsts } from "../app-consts";

export type AuthContextModel = {
    user: AuthUserModel;
    setUser: Dispatch<SetStateAction<AuthUserModel | undefined>>;
    signInAsync: (login: LoginModel) => Promise<AuthUserModel | undefined>;
}

const AuthContext = createContext({} as AuthContextModel);

function AuthContextProvider(props: any) {
    const [user, setUser] = useState<AuthUserModel>();

    const signInAsync = useCallback(async (login: LoginModel) => {
        const response = await httpClient.request({
            url: `${AppConsts.webApiRoutes.signIn}`,
            method: 'POST',
            data: login
        });
        if (response.status === 200) {
            const authUser = response.data;

            localStorage.setItem('@authUser', JSON.stringify(authUser));
            setUser(authUser);

            return authUser as AuthUserModel;
        }
    }, []);

    useEffect(() => {
        const authUserJson = localStorage.getItem('@authUser');
        if (authUserJson) {
            const authUser = JSON.parse(authUserJson) as AuthUserModel;
            setUser(authUser);
        }
    }, []);

    return <AuthContext.Provider value={{
        user,
        setUser,
        signInAsync
    }} {...props} />
}

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthContextProvider }
