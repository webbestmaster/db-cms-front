import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {appRoute} from '../../app-route';
import {LoginPage} from '../../page/login-page/c-login-page';
import {ErrorPage404} from '../../page/error-page-404/c-error-page-404';

export function App(): JSX.Element {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={LoginPage} exact path={appRoute.root.path}/>

                <Route component={ErrorPage404}/>
            </Switch>
        </BrowserRouter>
    );
}
