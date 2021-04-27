import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import { WelcomePage } from '../src/page/welcome-page/c-welcome-page';
import { log } from './util/log';
import { port } from './server-const';
const app = express();
app.listen(port, () => {
    log(`running at port: ${port}`);
    app.get('/api/test-api', (request, response) => {
        response.json({ success: true });
    });
    app.get('/api/html', (request, response) => {
        response.send(ReactDOMServer.renderToString(React.createElement(WelcomePage, null)));
    });
    // ReactDOMServer.renderToString
});
