import React from 'react';

import {CrudResponseType, makeDocument} from '../../api/api';

type UserModelType = {
    userId: string;
    login: string;
    password: string;
};

export function UserPage(): JSX.Element {
    return (
        <div>
            <button
                onClick={() => {
                    makeDocument<UserModelType>('user-model', {
                        userId: String(Date.now()),
                        password: 'pass',
                        login: String(Date.now() + '-my-login'),
                    })
                        .then((user: UserModelType) => {
                            console.log(user);
                        })
                        .catch(console.log);
                    console.info('post request to create user, after that refresh table');
                }}
                type="button"
            >
                add user
            </button>

            <h1>table with users</h1>
        </div>
    );
}
