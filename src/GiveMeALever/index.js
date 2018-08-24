import React from 'react';
import Tappable from 'react-tappable';

import World from '../World';
import Platform from '../Platform';

export const GiveMeALever = props => {
  const { handleTapEvent, position, rotate, rotateAndFall } = props;

  return (
    <div className='give-me-a-lever-container'>
      <World className='world' style={rotateAndFall} />
      <Tappable onTap={handleTapEvent}>
        <Platform
          style={rotate}
          position={position}
        />
      </Tappable>
    </div>
  );
}

export default GiveMeALever;
