import React from 'react';

import { UP } from '../utils';

const Lever = ({ view }) => {
  const leverClassNames = view === UP ? 'upright lever' : 'lever';

  return (
    <div className='give-me-a-lever-object'>
      <img
        alt='lever icon'
        className={leverClassNames}
        src='assets/vmp-logo-lever.png'
      />
    </div>
  );
}

export default Lever;
