import React from 'react';

import World from '../World';
import Lever from '../Lever';

const VMPLogo = () => (
  <div className="vmp-logo">
    <World logo />
    <Lever footer={false} />
  </div>
);

export default VMPLogo;
