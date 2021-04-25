import React, {useContext} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {appRoute} from '../../app-route';
import {LoginPage} from '../../page/login-page/c-login-page';
import {ErrorPage404} from '../../page/error-page-404/c-error-page-404';
import {UserContext} from '../../provider/user/c-user-context';
import {UserContextType} from '../../provider/user/user-context-type';
import {WelcomePage} from '../../page/welcome-page/c-welcome-page';
import {UserPage} from '../../page/user-page/c-user-page';
import {UserPageEdit} from '../../page/user-page/c-user-page-edit';

export function Routing(): JSX.Element {
    const providedUser = useContext<UserContextType>(UserContext);

    if (!providedUser.isLoggedIn) {
        return <LoginPage/>;
    }

    return (
        <BrowserRouter basename="db-cms-front-static-files">
            <Switch>
                <Route component={WelcomePage} exact path={appRoute.root.path}/>

                <Route component={UserPage} exact path={appRoute.user.path}/>

                <Route component={UserPageEdit} exact path={appRoute.userEdit.path}/>

                <Route component={ErrorPage404}/>
            </Switch>
        </BrowserRouter>
    );
}
