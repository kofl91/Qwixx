import React from 'react';
import ReactDOM from 'react-dom';
import {QuinxBoard} from './QuinxBoard';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render('QuinxBoard', div);
    ReactDOM.unmountComponentAtNode(div);
});
