import React from 'react';

const World = ({ logo = false, showGMAL = false, style }) => {
  let worldContainerClass = '';

  if (logo && showGMAL) {
    worldContainerClass = 'world-container-header world-header-fall world-hide';
  } else if (logo) {
    worldContainerClass = 'world-container-header';
  } else if (!logo && !showGMAL) {
    worldContainerClass = 'world-container-gmal-hidden';
  } else {
    worldContainerClass = 'world-container-gmal-visible';
  }

  console.log(worldContainerClass)

  return (
    <div className={worldContainerClass}>
      <img
        alt='world icon'
        className="world"
        src='assets/vmp-logo-world.png'
        style={style}
      />
    </div>
  );
}

export default World;
