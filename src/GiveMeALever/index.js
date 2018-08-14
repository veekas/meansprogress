import React, { Fragment } from 'react';

import PlatformAndWorld from './PlatformAndWorld';
import Lever from './Lever';

import './styles.css';

export const GiveMeALever = ({ handleTapEvent, position }) => (
  <Fragment>
    <PlatformAndWorld
      handleTapEvent={handleTapEvent}
      position={position}
    />
    <Lever />
  </Fragment>
);

export default GiveMeALever;
