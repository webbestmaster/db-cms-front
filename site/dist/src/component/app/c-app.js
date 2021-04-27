import React from 'react';
// import {UserProvider} from '../../provider/user/c-user-context';
import { Routing } from './c-routing';
export function App() {
    return (
    // <UserProvider>
    React.createElement(Routing, null)
    // </UserProvider>
    );
}
