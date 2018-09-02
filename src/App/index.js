import React, { Component } from 'react';

import Header from './Header';
import ContentMotionContainer from './ContentMotionContainer';

import { CONSOLE_QUOTE } from '../utils';

import './styles.css'

export default class App extends Component {
  state = { showGMAL: false };

  componentDidMount = () => {
    console.log('\n', CONSOLE_QUOTE, '\n\n');
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
