import React from 'react';
import ReactDOMServer from 'react-dom/server';

import express, {Application, Request, Response} from 'express';

import {WelcomePage} from '../src/page/welcome-page/c-welcome-page';

import {log} from './util/log';
import {port} from './server-const';


const app = express();

app.listen(port, (): void => {
    log(`running at port: ${port}`);

    app.get('/api/test-api', (request: Request, response: Response) => {
        response.json({success: true});
    });

    app.get('/api/html', (request: Request, response: Response) => {
        response.send(ReactDOMServer.renderToString(<WelcomePage/>));
    });

    // ReactDOMServer.renderToString
});
