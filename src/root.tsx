/* global document */

import React from 'react';
import {render} from 'react-dom';

import {selector} from './const';

const nodeWrapper = document.querySelector(selector.appWrapper);

function App() {
    return <h1>the app</h1>;
}

if (nodeWrapper !== null) {
    render(<App/>, nodeWrapper);
} else {
    console.error('Can not find nodeWrapper');
}
