import React, { Component } from 'react';
import Tappable from 'react-tappable';
import { Motion, spring } from 'react-motion';

export default class Platform extends Component {
  render() {
    const { handleTapEvent, position } = this.props;

    return (
      <div className='give-me-a-lever-object'>
        <Tappable onTap={handleTapEvent}>
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
