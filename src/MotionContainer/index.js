import React, { Component, Fragment } from 'react';
import { Motion, spring } from 'react-motion';

import Content from '../Content';
import GiveMeALever from '../GiveMeALever';
import utils from '../utils';

const { QUOTE, VMP_ASCII, FLAT, LEFT_DOWN, RIGHT_DOWN } = utils;
const TRANSLATE_X_LEFT = -9;
const TRANSLATE_X_RIGHT = Math.abs(TRANSLATE_X_LEFT);

export default class MotionContainer extends Component {
  initialState = { position: FLAT }
  state = this.initialState;

  componentDidMount = () => {
    console.log(QUOTE, '\n', VMP_ASCII);
  }

  handleTapEvent = () => {
    const position = this.state.position >= FLAT ? LEFT_DOWN : RIGHT_DOWN;
    this.setState({ position });
  }

  // handleReset = () => {
  //   this.setState(this.initialState);
  // }

  render() {
    const { position } = this.state;
    const translateX = position >= 0 ? TRANSLATE_X_RIGHT : TRANSLATE_X_LEFT;

    return (
      <Motion
        defaultStyle={{ position, translateX }}
        style={{
          position: spring(position),
          translateX: spring(translateX, { stiffness: 20, damping: 5 })
        }}
      >
        {style => {
          const rotateVal = `rotate(${style.position}deg)`;
          const fallVal = `translateX(${style.translateX}vh)`
          const rotate = { transform: rotateVal };
          const rotateAndFall = { transform: `${rotateVal} ${fallVal}` };

          return (
            <Fragment>
              <Content style={rotate} />
              <GiveMeALever
                handleTapEvent={this.handleTapEvent}
                position={position}
                rotate={rotate}
                rotateAndFall={rotateAndFall}
              />
            </Fragment>
          );
        }}
      </Motion>
    );
  }
}
