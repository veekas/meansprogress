import React from 'react';

import './index.css'

const Headshot = ({ visibility }) => (
  <img
    alt="veekas shrivastava headshot"
    src="assets/veekas-shrivastava-headshot-small.jpeg"
    className={`headshot ${visibility}`}
  />
);

export default Headshot;
