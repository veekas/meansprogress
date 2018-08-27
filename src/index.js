import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './Layout';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

window.scrollTo(0,document.body.scrollHeight);

ReactDOM.render(
  <Layout />,
  document.getElementById('progress'),
);

registerServiceWorker();
