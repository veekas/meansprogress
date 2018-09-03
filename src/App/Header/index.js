import React from 'react';

import Headshot from './Headshot';
import Lever from './Lever';
import World from '../shared/World';
import './index.css';

const Header = ({ showGMAL, toggleGAML }) => {
  const headshotVisibility = showGMAL ? 'headshot-visible' : 'headshot-hidden';

  return (
    <div className="header-container">
      <div className="header-clickable-container" onClick={toggleGAML} />
      <World header showGMAL={showGMAL} />
      <Lever showGMAL={showGMAL} />
      <Headshot visibility={headshotVisibility} />
    </div>
  );
}

export default Header;
