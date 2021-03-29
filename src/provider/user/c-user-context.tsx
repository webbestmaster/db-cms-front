import React, {useCallback, useEffect, useMemo, useState} from 'react';

import {UserContextType, UserType} from './user-context-type';
import {defaultUserContextData} from './user-context-const';
import {login} from './user-context-api';

export const UserContext: React.Context<UserContextType> = React.createContext<UserContextType>(defaultUserContextData);

type PropsType = {
    children: JSX.Element | Array<JSX.Element>;
};

export function UserProvider(props: PropsType): JSX.Element {
    const {children} = props;
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(defaultUserContextData.isLoggedIn);

    const providedLogin = useCallback((useLogin: string, password: string): Promise<UserType> => {
        return login(useLogin, password).then(
            (result: UserType): UserType => {
                setIsLoggedIn(true);

                return result;
            }
        );
    }, []);

    const providerData: UserContextType = useMemo<UserContextType>((): UserContextType => {
        return {
            login: providedLogin,
            isLoggedIn,
        };
    }, [isLoggedIn, providedLogin]);

    return <UserContext.Provider value={providerData}>{children}</UserContext.Provider>;
}
