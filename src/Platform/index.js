import React from 'react';

const Platform = ({ showGMAL, style }) => {
  const platformContainerClass = showGMAL ? 'platform-container-show' : 'platform-container-hide';

  return (
    <div className={platformContainerClass}>
      <img
        alt="platform icon"
        className="platform"
        src="assets/vmp-logo-platform.png"
        style={style}
      />
    </div>
  );
}

export default Platform;
