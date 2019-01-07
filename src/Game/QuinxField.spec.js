import React from 'react';
import ReactDOM from 'react-dom';
import {QuinxField} from './QuinxField';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render('QuinxField', div);
    ReactDOM.unmountComponentAtNode(div);
});
