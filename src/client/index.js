import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import rootRoute from './../routes';

render(<Router history={browserHistory} routes={rootRoute} />, document.getElementById('root'));
