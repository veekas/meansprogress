import React from 'react';

const World = ({ logo, style }) => {
  const worldContainerClass = logo ? 'world-container-vmp' : 'world-container-gmal';
  const worldClass = logo ? '' : 'world-footer';

  return (
    <div className={worldContainerClass} style={style}>
      <img
        alt='world icon'
        className={`world ${worldClass}`}
        src='assets/vmp-logo-world.png'
      />
    </div>
  );
}

export default World;
