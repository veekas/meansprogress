import React, { Component } from 'react';

import Headshot from '../Headshot';
import Lever from '../Lever';
import World from '../World';

class Header extends Component {
  state = { showHeadshot: false };

  onClick = () => {
    const showHeadshot = !this.state.showHeadshot;
    this.setState({ showHeadshot });
  }

  render() {
    const { showHeadshot } = this.state;
    const headshotVisibility = showHeadshot ? 'visible' : 'hidden';

    return (
      <div className="vmp-logo" onClick={this.onClick}>
        <World logo />
        <Lever footer={false} />
        <Headshot visibility={headshotVisibility} />
      </div>
    );
  }
}

export default Header;
