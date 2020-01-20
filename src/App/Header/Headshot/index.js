import React from 'react';

import './index.css'

const Headshot = ({ visibility }) => (
  <img
    alt="veekas ashoka headshot"
    src="assets/veekas-ashoka-headshot-small.jpeg"
    className={`headshot ${visibility}`}
  />
);

export default Headshot;
