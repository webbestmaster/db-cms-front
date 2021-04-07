import crypto from 'crypto';

import {runDBCmsServer, DatabaseCmsConfigType, ModelConfigType} from 'db-cms';

export function getRandomString(): string {
    // const algorithm = 'aes-256-ctr';
    // const randomBytes = crypto.randomBytes(16);

    return crypto.randomBytes(16).toString('hex');
}

const mainDataBaseName = 'main-db';

const userModel: ModelConfigType = {
    name: 'User',
    id: 'user-model',
    schema: {
        type: 'object',
        properties: {
            userId: {type: 'string', required: true},
            login: {type: 'string', required: true},
            password: {type: 'string', required: true},
        },
    },
    keyId: 'userId',
};

const documentModel: ModelConfigType = {
    name: 'Document',
    id: 'document-model',
    schema: {
        type: 'object',
        properties: {
            documentId: {type: 'string', required: true},
            title: {type: 'string', required: true},
            description: {type: 'string', required: true},
            content: {type: 'string', required: true},
            author: {type: 'string', required: true},
        },
    },
    keyId: 'documentId',
};

const databaseCmsServerConfig: DatabaseCmsConfigType = {
    file: {
        folder: 'folder-for-files',
    },
    api: {
        prefix: '/db-cms',
    },
    port: 3000,
    modelList: [userModel, documentModel],
    adminList: [
        {
            login: 'admin',
            password: 'some-password',
            hash: getRandomString(),
            apiKey: 'some secret api key',
        },
    ],
    database: {
        name: mainDataBaseName,
        connectUrl: 'mongodb://localhost:27001,localhost:27002,localhost:27003,localhost:27004?replicaSet=dbCmsReplica',
        shallCommand: {
            start: './server/mongo-db-on-update.sh',
            update: './server/mongo-db-on-update.sh',
        },
    },
};

runDBCmsServer(databaseCmsServerConfig);
