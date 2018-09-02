import React from 'react';

import './styles.css'

const Headshot = ({ visibility }) => (
  <div className="headshot-container">
    <img
      alt="test"
      src="assets/veekas-shrivastava-headshot-small.jpeg"
      className={visibility}
    />
  </div>
);

export default Headshot;
