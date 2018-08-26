import React from 'react';

const Platform = ({ showGMAL, style }) => {
  const showOrHide = showGMAL ? 'platform-show' : 'platform-hide';

  return (
    <img
      alt="platform icon"
      className={`platform ${showOrHide}`}
      src="assets/vmp-logo-platform.png"
      style={style}
    />
  );
}

export default Platform;
