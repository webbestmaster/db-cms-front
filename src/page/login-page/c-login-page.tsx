import React from 'react';

export function LoginPage(): JSX.Element {
    return (
        <form>
            <input name="login" placeholder="login" type="text"/>

            <br/>

            <input name="passoword" placeholder="password" type="text"/>

            <br/>

            <input type="submit"/>
        </form>
    );
}
