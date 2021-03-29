import React, {useContext} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {appRoute} from '../../app-route';
import {LoginPage} from '../../page/login-page/c-login-page';
import {ErrorPage404} from '../../page/error-page-404/c-error-page-404';
import {UserContext} from '../../provider/user/c-user-context';
import {UserContextType} from '../../provider/user/user-context-type';
import {WelcomePage} from '../../page/welcome-page/c-welcome-page';

export function Routing(): JSX.Element {
    const providedUser = useContext<UserContextType>(UserContext);

    if (!providedUser.isLoggedIn) {
        return <LoginPage/>;
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route component={WelcomePage} exact path={appRoute.root.path}/>

                <Route component={ErrorPage404}/>
            </Switch>
        </BrowserRouter>
    );
}
