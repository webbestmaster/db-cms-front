/* global HTMLFormElement, alert */
import React, {SyntheticEvent, useContext} from 'react';

import {UserContextType} from '../../provider/user/user-context-type';
import {UserContext} from '../../provider/user/c-user-context';

export function LoginPage(): JSX.Element {
    const providedUser = useContext<UserContextType>(UserContext);

    function handleSubmit(evt: SyntheticEvent<HTMLFormElement>) {
        evt.preventDefault();

        const {currentTarget: form} = evt;

        const {login, password} = form;

        providedUser.login(login.value, password.value).catch(() => {
            // eslint-disable-next-line no-alert
            alert('wrong login or password');
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <input name="login" placeholder="login" type="text"/>

            <br/>

            <input autoComplete="on" name="password" placeholder="password" type="password"/>

            <br/>

            <input type="submit" value="login"/>
        </form>
    );
}
