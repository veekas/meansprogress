import React from 'react';

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
