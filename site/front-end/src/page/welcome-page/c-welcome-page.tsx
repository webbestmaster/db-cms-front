import React from 'react';

export function WelcomePage(): JSX.Element {
    fetch('/api/test-api')
        .then((response: Response): unknown => response.json())
        .then(console.log);

    return (
        <div>
            <h1>welcome</h1>
        </div>
    );
}
