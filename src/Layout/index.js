import React, { Component } from 'react';

import Header from '../Header';
import ContentMotionContainer from '../ContentMotionContainer';

import { QUOTE, VMP_ASCII } from '../utils';

import './styles.css'

export default class Layout extends Component {
  state = { showGMAL: false };

  componentDidMount = () => {
    console.log('\n', QUOTE, '\n', VMP_ASCII);
  }

  toggleGAML = () => {
    const showGMAL = !this.state.showGMAL;
    this.setState({ showGMAL });
  }

  render() {
    const { showGMAL } = this.state;

    return (
      <div className="layout">
        <Header
          showGMAL={showGMAL}
          toggleGAML={this.toggleGAML}
        />
        <ContentMotionContainer showGMAL={showGMAL} />
      </div>
    );
  }
}
