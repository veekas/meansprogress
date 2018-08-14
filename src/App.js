import React, { Component } from 'react';

// import { QUOTE, VMP_ASCII, VMP_ASCII_VERT, FLAT, LEFT_DOWN, RIGHT_DOWN } from './utils';
import utils from './utils';
import GiveMeALever from './GiveMeALever';

import './App.css';

const { QUOTE, VMP_ASCII, FLAT, LEFT_DOWN, RIGHT_DOWN } = utils;

export default class App extends Component {
  initialState = { position: FLAT }
  state = this.initialState;

  handleTapEvent = () => {
    const position = this.state.position >= FLAT ? LEFT_DOWN : RIGHT_DOWN;
    this.setState({ position });
  };

  render() {
    const { position } = this.state;
    console.log(QUOTE, '\n', VMP_ASCII);
    console.log(position);

    return (
      <div className='give-me-a-lever-container'>
        <GiveMeALever
          handleTapEvent={this.handleTapEvent}
          position={position}
        />
      </div>
    );
  }
}
