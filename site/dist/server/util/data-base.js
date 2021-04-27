"use strict";
/*
import {Collection, Db, MongoClient} from 'mongodb';

import {DatabaseCmsConfigType} from '../data-base-cms-type';

export const dataBaseMaster = {
    getCollection: function getCollection<ItemType>(
        databaseCmsConfig: DatabaseCmsConfigType,
        collectionName: string
    ): Collection<ItemType> {
        return dataBaseMaster.getDataBase().collection<ItemType>(collectionName);
    },

    getDataBase: function getDataBase(): Db {
        throw new Error('No data base. Initialize method dataBaseMaster.getDataBase');
    },

    initialDataBase: function initialDataBase(databaseCmsConfig: DatabaseCmsConfigType): Promise<Db> {
        const {database} = databaseCmsConfig;
        const {name, connectUrl} = database;

        const options = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        };

        return MongoClient.connect(connectUrl, options).then(
            (client: MongoClient): Db => {
                const dataBase: Db = client.db(name);

                dataBaseMaster.getDataBase = function getDataBase(): Db {
                    return dataBase;
                };

                return dataBase;
            }
        );
    },
};
*/
