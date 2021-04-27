import express, {Application, Request, Response} from 'express';


import {log} from './util/log';
import {port} from './server-const';

const app = express();

app.listen(port, (): void => {
    log(`running at port: ${port}`);

    app.get('/api/test-api', (request: Request, response: Response) => {
        response.json({success: true});
    });
});
