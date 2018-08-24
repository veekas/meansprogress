import React from 'react';

const Lever = ({ footer }) => {
  const leverContainerClass = footer ? 'lever-container-footer' : 'lever-container-header';
  const leverType = footer ? 'lever-footer' : 'lever-header';
  const leverClasses = `lever ${leverType}`;

  return (
    <div className={leverContainerClass}>
      <img
        alt='lever icon'
        className={leverClasses}
        src='assets/vmp-logo-lever.png'
      />
    </div>
  );
}

export default Lever;
