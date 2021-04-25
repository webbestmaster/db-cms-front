import {UserContextType, UserType} from './user-context-type';

export const defaultUserContextData: UserContextType = {
    login: (login: string, password: string): Promise<UserType> => {
        throw new Error('Promise<UserType>()');
    },
    isLoggedIn: false,
};
