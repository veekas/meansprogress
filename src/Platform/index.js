import React from 'react';

const Platform = ({ onClick, showGMAL, style }) => {
  const showOrHide = showGMAL ? 'platform-show' : 'platform-hide';

  return (
    <img
      alt="a place to stand"
      className={`platform ${showOrHide}`}
      onClick={onClick}
      src="assets/vmp-logo-platform.png"
      style={style}
    />
  );
}

export default Platform;
