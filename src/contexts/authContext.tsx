import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { AuthUserModel } from "../models/auth-user-model";

export type AuthContextModel = {
    user: AuthUserModel;
    setUser: Dispatch<SetStateAction<AuthUserModel | undefined>>
}

const AuthContext = createContext({} as AuthContextModel);

function AuthContextProvider(props: any) {
    const [user, setUser] = useState<AuthUserModel>();

    useEffect(() => {
        const authUserJson = localStorage.getItem('@authUser');
        if (authUserJson) {
            const authUser = JSON.parse(authUserJson) as AuthUserModel;
            setUser(authUser);
        }
    }, [])

    return <AuthContext.Provider value={{
        user,
        setUser
    }} {...props} />
}

const useAuthContext = () => useContext(AuthContext);

export { useAuthContext, AuthContextProvider }
