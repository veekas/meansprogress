import React, { Component } from 'react';
import Tappable from 'react-tappable';

import World from '../World';
import Platform from '../Platform';

export default class GiveMeALever extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.rotateAndFallWorld.transform !== this.props.rotateAndFallWorld.transform
      || nextProps.rotate.transform !== this.props.rotate.transform
      || nextProps.showGMAL !== this.props.showGMAL
    );
  }

  render() {
    const { handleTapEvent, position, rotate, rotateAndFallWorld, showGMAL } = this.props;

    return (
      <div className='gmal-container'>
        <World
          className='world'
          showGMAL={showGMAL}
          style={rotateAndFallWorld}
        />
        <Tappable onTap={handleTapEvent}>
          <Platform
            position={position}
            showGMAL={showGMAL}
            style={rotate}
          />
        </Tappable>
      </div>
    );
  }
}
