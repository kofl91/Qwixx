import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'

it('renders without crashing', () => {
    const div = document.createElement('div');
    const store = {
        getState: jest.fn(() => ({diceRolls:{test:'s'}})),
        dispatch: jest.fn(),
        subscribe: jest.fn()
    };
    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});
