import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

import Content from '../Content';
import GiveMeALever from '../GiveMeALever';
import utils from '../utils';

const { FLAT, ANGLE_LEFT, ANGLE_RIGHT } = utils;
const TRANSLATE_X_LEFT = -9;
const TRANSLATE_X_RIGHT = Math.abs(TRANSLATE_X_LEFT);

export default class MotionContainer extends Component {
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

    let translateXText = 0;
    if (position > 0) {
      translateXText = TRANSLATE_X_RIGHT;
    } else if (position < 0) {
      translateXText = TRANSLATE_X_LEFT;
    };

    const translateXWorld = position >= 0 ? TRANSLATE_X_RIGHT : TRANSLATE_X_LEFT;

    return (
      <Motion
        defaultStyle={{ position, translateXText, translateXWorld }}
        style={{
          position: spring(position),
          translateXWorld: spring(translateXWorld, { stiffness: 20, damping: 5 }),
          translateXText: spring(translateXText, { stiffness: 10, damping: 6 }),
        }}
      >
        {style => {
          const rotateVal = `rotate(${style.position}deg)`;
          const textFall = `translateX(${style.translateXText}vh)`;
          const worldFall = `translateX(${style.translateXWorld}vh)`
          const rotate = { transform: rotateVal };
          const rotateAndFallText = { transform: `${rotateVal} ${textFall}` };
          const rotateAndFallWorld = { transform: `${rotateVal} ${worldFall}` };

          return (
            <div className="motion-container">
              <Content style={rotateAndFallText} />
              <GiveMeALever
                handleTapEvent={this.handleTapEvent}
                position={position}
                rotate={rotate}
                rotateAndFall={rotateAndFallWorld}
              />
            </div>
          );
        }}
      </Motion>
    );
  }
}
