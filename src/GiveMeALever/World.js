import React from 'react';

const World = ({ className, overlap, style }) => (
  <div className={(
    overlap
      ? 'give-me-a-lever-object overlap'
      : 'give-me-a-lever-object'
  )}>
    <img
      alt='world icon'
      className={className}
      src='assets/vmp-logo-world.png'
      style={style}
    />
  </div>
);

export default World;
