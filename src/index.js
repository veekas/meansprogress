import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './Layout';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(
  <Layout />,
  document.getElementById('progress'),
);
// TODO: make service worker save everything
registerServiceWorker();
