import React, {useEffect} from 'react';

import {useDocumentHook, useDocumentListHook} from '../../api/api-hook';

type UserModelType = {
    userId: string;
    login: string;
    password: string;
};

export function UserPage(): JSX.Element {
    const documentHook = useDocumentHook<UserModelType>();
    const {readDocumentList, result: documentList} = useDocumentListHook<UserModelType>();

    console.log('documentHook.isInProgress', documentHook.isInProgress);
    console.log('documentListHook.isInProgress', readDocumentList);

    useEffect(() => {
        readDocumentList('user-model', {pageIndex: 0, objectsPerPage: 5, queryParameters: null});
    }, [readDocumentList]);

    return (
        <div>
            <button
                onClick={() => {
                    documentHook
                        .createDocument('user-model', {
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

            <div>
                <pre>{JSON.stringify(documentList, null, 4)}</pre>
            </div>
        </div>
    );
}
