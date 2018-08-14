import React, { Component } from 'react';
import Tappable from 'react-tappable';
import { Motion, spring } from 'react-motion';

import { FLAT, LEFT_DOWN, RIGHT_DOWN } from '../utils';

export default class Platform extends Component {
  initialState = { position: FLAT }
  state = this.initialState;

  handleTapEvent = (e) => {
    const position = this.state.position >= FLAT ? LEFT_DOWN : RIGHT_DOWN;
    this.setState({ position });
  };

  render() {
    const { position } = this.state;

    return (
      <div className='give-me-a-lever-object'>
        <Tappable onTap={this.handleTapEvent}>
          <Motion
            defaultStyle={{ position }}
            style={{ position: spring(position) }}>
            {style => (
              <img
                style={{ transform: `rotate(${style.position}deg)` }}
                className="platform"
                src="assets/vmp-logo-platform.png"
                alt="platform icon"
              />
            )}
          </Motion>
        </Tappable>
      </div>
    );
  }
}
