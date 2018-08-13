import React, { Component } from 'react';
import Tappable from 'react-tappable';
import { Motion, spring } from 'react-motion';

export default class Platform extends Component {
  handleTapEvent = () => {
    console.log('hello');
  };

  render() {
    return (
      <Tappable onTap={this.handleTapEvent}>
        <Motion defaultStyle={{ x: 0 }} style={{ x: spring(100) }}>
          {style => (
            <img
              style={style}
              // className="platform"
              src="assets/vmp-logo-platform.png"
              alt="platform icon"
            />
          )}
        </Motion>
      </Tappable>
    );
  }
}
