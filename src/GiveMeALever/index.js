import React from 'react';
import Tappable from 'react-tappable';

import World from './World';
import Lever from './Lever';
import Platform from './Platform';

import './styles.css';

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
      <Lever view={null} />
    </div>
  );
}

export default GiveMeALever;
