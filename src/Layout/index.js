import React, { Component } from 'react';

import VMPLogo from '../VMPLogo';
import ContentMotionContainer from '../ContentMotionContainer';
import Lever from '../Lever';

import { QUOTE, VMP_ASCII } from '../utils';

import './styles.css'

export default class Layout extends Component {
  // TODO: manage state for logo/headshot

  componentDidMount = () => {
    console.log('\n', QUOTE, '\n', VMP_ASCII);
  }

  render() {
    return (
      <div className="layout">
        <VMPLogo />
        <ContentMotionContainer />
        <Lever footer />
      </div>
    );
  }
}
