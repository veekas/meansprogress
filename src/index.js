import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

window.scrollTo(0,document.body.scrollHeight);

ReactDOM.render(
  <App />,
  document.getElementById('progress'),
);

registerServiceWorker();
