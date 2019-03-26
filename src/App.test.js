import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppWrapper from './routeConfig'

it('renders without crashing', () => {
const div = document.createElement('div');
ReactDOM.render(<App />, div);
ReactDOM.unmountComponentAtNode(div);
});

it('renders routing Config', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppWrapper />, div);
    ReactDOM.unmountComponentAtNode(div);
});