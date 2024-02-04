import { Dispatch, SetStateAction, createContext, useCallback, useContext, useEffect, useState } from "react";
import { AuthUserModel } from "../models/auth-user-model";
import { httpClient } from "../data-access/http-client";
import { LoginModel } from "../models/login-model";
import { AppConsts } from "../app-consts";
import { RegistrationModel } from "../models/registration-model";
import { AxiosError } from "axios";
import notify from "devextreme/ui/notify";
import { formatMessage } from "devextreme/localization";

export type AuthContextModel = {
    user: AuthUserModel;
    setUser: Dispatch<SetStateAction<AuthUserModel | undefined>>;
    signInAsync: (login: LoginModel) => Promise<AuthUserModel | undefined>;
    signOutAsync: () => Promise<void>;
    registrationAsync: (registration: RegistrationModel) => Promise<RegistrationModel | null>;
}

const AuthContext = createContext({} as AuthContextModel);

function AuthProvider(props: any) {
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

    const signOutAsync = useCallback(async () => {
        localStorage.removeItem('@authUser');
        setUser(undefined);
    }, [])

    const registrationAsync = useCallback(async (registration: RegistrationModel) => {
        try {
            const response = await httpClient.request({
                url: `${AppConsts.webApiRoutes.registration}`,
                method: 'POST',
                data: registration
            });
            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            notify({
                message: 'An error was happened during the registration.',
                type: 'error',
                displayTime: 5000
            });

            return null
        }

    }, [])

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
        signInAsync,
        signOutAsync,
        registrationAsync
    }} {...props} />
}

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider }
