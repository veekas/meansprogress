import React from 'react';

import './styles.css';

const World = ({ logo = false, showGMAL = false, style }) => {
  let worldContainerClass = 'world';

  if (logo && showGMAL) {
    worldContainerClass += ' world-container-header world-header-fall world-hide';
  } else if (logo) {
    worldContainerClass += ' world-container-header';
  } else if (!logo && !showGMAL) {
    worldContainerClass += ' world-container-gmal-hidden';
  } else {
    worldContainerClass += ' world-container-gmal-visible';
  }

  return (
    <div className={worldContainerClass}>
      <img
        alt="the world"
        className="world"
        src="assets/vmp-logo-world.png"
        style={style}
      />
    </div>
  );
}

export default World;
