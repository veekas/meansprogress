import React from 'react';

import Headshot from '../Headshot';
import Lever from '../Lever';
import World from '../World';

const Header = ({ showGMAL, toggleGAML }) => {
  const headshotVisibility = showGMAL ? 'headshot-visible' : 'headshot-hidden';

  return (
    <div className="header-container">
      <div className="header-clickable-container" onClick={toggleGAML} />
      <World logo showGMAL={showGMAL} />
      <Lever showGMAL={showGMAL} />
      <Headshot visibility={headshotVisibility} />
    </div>
  );
}

export default Header;
