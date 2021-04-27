import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { appRoute } from '../../app-route';
import { ErrorPage404 } from '../../page/error-page-404/c-error-page-404';
// import {UserContext} from '../../provider/user/c-user-context';
// import {UserContextType} from '../../provider/user/user-context-type';
import { WelcomePage } from '../../page/welcome-page/c-welcome-page';
export function Routing() {
    // const providedUser = useContext<UserContextType>(UserContext);
    return (React.createElement(BrowserRouter, null,
        React.createElement(Switch, null,
            React.createElement(Route, { component: WelcomePage, exact: true, path: appRoute.root.path }),
            React.createElement(Route, { component: ErrorPage404 }))));
}
