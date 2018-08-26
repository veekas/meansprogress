import React from 'react';

const Lever = ({ showGMAL }) => {
  const leverType = showGMAL ? 'lever-footer' : 'lever-header';
  const leverClasses = `lever ${leverType}`;

  return (
    <div className="lever-container">
      <img
        alt='lever icon'
        className={leverClasses}
        src='assets/vmp-logo-lever.png'
      />
    </div>
  );
}

export default Lever;
