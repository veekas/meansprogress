import React, { Fragment } from 'react';

import World from './World';
import Platform from './Platform';
import Lever from './Lever';

import './styles.css';

export const GiveMeALever = ({ handleTapEvent, position }) => (
  <Fragment>
    <World />
    <Platform
      handleTapEvent={handleTapEvent}
      position={position}
    />
    <Lever />
  </Fragment>
);

export default GiveMeALever;
