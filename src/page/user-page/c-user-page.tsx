import React from 'react';

import {useDocumentHook} from '../../api/api-hook';

type UserModelType = {
    userId: string;
    login: string;
    password: string;
};

export function UserPage(): JSX.Element {
    const {createDocument, isInProgress, readDocumentById} = useDocumentHook<UserModelType>();

    console.log('isInProgress', isInProgress);

    return (
        <div>
            <button
                onClick={() => {
                    createDocument('user-model', {
                        userId: String(Date.now()),
                        password: 'pass',
                        login: String(Date.now() + '-my-login'),
                    })
                        .then((user: UserModelType) => {
                            console.log(user);
                        })
                        .catch((error: Error) => {
                            console.error(error);
                        });

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
