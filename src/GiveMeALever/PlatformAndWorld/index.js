import React, { Fragment } from 'react';
import { Motion, spring } from 'react-motion';
import Tappable from 'react-tappable';

import World from './World';
import Platform from './Platform';

const PlatformAndWorld = ({ handleTapEvent, position }) => {
  const translateX = position >= 0 ? 75 : -75;

  return (
    <Motion
      defaultStyle={{ position, translateX }}
      style={{ position: spring(position), translateX: spring(translateX, { stiffness: 20, damping: 5 }) }}>
      {style => {
        const rotateVal = `rotate(${style.position}deg)`;
        const fallVal = `translateX(${style.translateX}px)`

        const rotate = { transform: rotateVal };
        const rotateAndFall = { transform: `${rotateVal} ${fallVal}` };

        return (
          <Fragment>
            <World
              style={rotateAndFall}
              // position={position}
            />
            <Tappable onTap={handleTapEvent}>
              <Platform
                style={rotate}
                handleTapEvent={handleTapEvent}
                position={position}
              />
            </Tappable>
          </Fragment>
        );
      }}
    </Motion>
  );
}

export default PlatformAndWorld;
