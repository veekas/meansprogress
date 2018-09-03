import React from 'react';

import './index.css';

const World = ({ header = false, showGMAL = false, style }) => {
  let worldClasses ='world';
  let worldContainerClasses = '';

  if (header && showGMAL) {
    worldClasses += ' world-header-fall';
    worldContainerClasses += 'world-container-header';
  } else if (header) {
    worldClasses += ' world-header-rise';
    worldContainerClasses += 'world-container-header';
  } else if (!header && !showGMAL) {
    // worldClasses += '';
    worldContainerClasses += 'world-container-footer world-container-footer-hidden';
  } else {
    // worldClasses += '';
    worldContainerClasses += 'world-container-footer world-container-footer-visible';
  }

  return (
    <div className={worldContainerClasses}>
      <img
        alt="the world"
        className={worldClasses}
        src="assets/vmp-logo-world.png"
        style={style}
      />
    </div>
  );
}

export default World;
