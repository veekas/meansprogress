import React, { Component } from 'react';
import Tappable from 'react-tappable';
import { Motion, spring } from 'react-motion';

export default class Platform extends Component {
  state = { show: false }

  handleTapEvent = (e) => {
    const { show } = this.state;
    this.setState({ show: !show });
  };

  render() {
    const { show } = this.state;

    return (
      <Tappable onTap={this.handleTapEvent}>
        <Motion
          defaultStyle={{ x: -100 }}
          style={{ x: spring(show ? 100 : -100) }}>
          {style => (
            <img
              style={{ transform: `translateX(${style.x}px)` }}
              className="platform"
              src="assets/vmp-logo-platform.png"
              alt="platform icon"
            />
          )}
        </Motion>
      </Tappable>
    );
  }
}
