import React, { Component } from 'react';
import Tappable from 'react-tappable';

import World from '../World';
import Platform from '../Platform';

export default class GiveMeALever extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.rotateAndFall.transform !== this.props.rotateAndFall.transform
      || nextProps.rotate.transform !== this.props.rotate.transform
    );
  }

  render() {
    const { handleTapEvent, position, rotate, rotateAndFall, showGMAL } = this.props;

    return (
      <div className='gmal-container'>
        <World className='world' style={rotateAndFall} />
        <Tappable onTap={handleTapEvent}>
          <Platform
            style={rotate}
            position={position}
            showGMAL={showGMAL}
          />
        </Tappable>
      </div>
    );
  }
}
