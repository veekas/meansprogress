import React from 'react';

import './index.css';

const Platform = ({ onClick, showGMAL, style }) => {
  const showOrHide = showGMAL ? 'platform-show' : 'platform-hide';

  return (
    // <div class="platform-container">
      <img
        alt="a place to stand"
        className={`platform ${showOrHide}`}
        onClick={onClick}
        src="assets/vmp-logo-platform.png"
        style={style}
      />
    // </div>
  );
}

export default Platform;
