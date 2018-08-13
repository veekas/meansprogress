import React, { Component } from 'react';

import { QUOTE, VMP_ASCII } from './utils';
import GiveMeALever from './GiveMeALever';

import './App.css';

export default class App extends Component {
  render() {
    console.log(QUOTE, '\n', VMP_ASCII);

    return (
      <div className='give-me-a-lever-container'>
        <GiveMeALever />
      </div>
    );
  }
}
