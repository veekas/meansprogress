import React, { Component } from 'react';

import Hint from './Hint';
import Platform from './Platform';
import Quote from './Quote';
import World from '../../shared/World';

import './styles.css';

export default class GiveMeALever extends Component {
  shouldComponentUpdate(nextProps) {
    return (
      nextProps.transformWorld.transform !== this.props.transformWorld.transform
      || nextProps.rotate.transform !== this.props.rotate.transform
      || nextProps.showGMAL !== this.props.showGMAL
    );
  }

  render() {
    const {
      moveTheWorld, previousView, rotate, rotateAngle, showGMAL, transformWorld
    } = this.props;

    return (
      <div className='gmal-container'>
        <World
          showGMAL={showGMAL}
          style={transformWorld}
        />
        <Platform
          onClick={moveTheWorld}
          showGMAL={showGMAL}
          style={rotate}
        />
        <Quote showGMAL={showGMAL} />
        <Hint
          platformAngle={rotateAngle}
          previousView={previousView}
          showGMAL={showGMAL}
        />
      </div>
    );
  }
}
