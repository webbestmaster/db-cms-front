import {fetchX} from '../../util/fetch';

import {UserType} from './user-context-type';

export function login(userLogin: string, userPassword: string): Promise<UserType> {
    return fetchX<UserType>('/db-cms/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({login: userLogin, password: userPassword}),
    });
}
