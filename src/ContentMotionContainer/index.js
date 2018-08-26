import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

import Content from '../Content';
import GiveMeALever from '../GiveMeALever';
import utils from '../utils';

const { FLAT, ANGLE_LEFT, ANGLE_RIGHT } = utils;
const TRANSLATE_X_LEFT = -9;
const TRANSLATE_X_RIGHT = Math.abs(TRANSLATE_X_LEFT);

export default class ContentMotionContainer extends Component {
  initialState = { position: FLAT }
  state = this.initialState;

  handleTapEvent = () => {
    const position = this.state.position >= FLAT ? ANGLE_LEFT : ANGLE_RIGHT;
    this.setState({ position });
  }

  // handleReset = () => {
  //   this.setState(this.initialState);
  // }

  render() {
    const { position } = this.state;
    const { showGMAL } = this.props;

    let translateX = 0;
    if (position > 0) {
      translateX = TRANSLATE_X_RIGHT;
    } else if (position < 0) {
      translateX = TRANSLATE_X_LEFT;
    };

    return (
      <Motion
        defaultStyle={{ position, translateX }}
        style={{
          position: spring(position),
          translateXWorld: spring(translateX, { stiffness: 20, damping: 5 }),
          translateX: spring(translateX, { stiffness: 10, damping: 6 }),
        }}
      >
        {style => {
          const rotateVal = `rotate(${style.position}deg)`;
          const worldFall = `translateX(${style.translateX}vh)`
          const rotate = { transform: rotateVal };
          const rotateAndFall = { transform: `${rotateVal} ${worldFall}` };

          return (
            <div className="motion-container">
              <Content style={rotateAndFall} />
              <GiveMeALever
                handleTapEvent={this.handleTapEvent}
                position={position}
                rotate={rotate}
                rotateAndFall={rotateAndFall}
                showGMAL={showGMAL}
              />
            </div>
          );
        }}
      </Motion>
    );
  }
}
