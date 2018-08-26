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
        style={{
          position: spring(position),
          translateWorld: spring(translateX, { stiffness: 20, damping: 5 }),
          translateText: spring(translateX, { stiffness: 10, damping: 6 }),
        }}
      >
        {style => {
          const rotateVal = `rotate(${style.position}deg)`;
          const rotate = { transform: rotateVal };
          const textFall = `translateX(${style.translateText}vh)`
          const worldFall = `translateX(${style.translateWorld}vh)`
          const rotateAndFallText = { transform: `${rotateVal} ${textFall}` };
          const rotateAndFallWorld = { transform: `${rotateVal} ${worldFall}` };

          return (
            <div className="motion-container">
              <Content style={rotateAndFallText} />
              <GiveMeALever
                handleTapEvent={this.handleTapEvent}
                position={position}
                rotate={rotate}
                rotateAndFallWorld={rotateAndFallWorld}
                showGMAL={showGMAL}
              />
            </div>
          );
        }}
      </Motion>
    );
  }
}
