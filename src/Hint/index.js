import React from 'react';

import { FLAT } from '../utils';

const Hint = ({ showGMAL, worldPosition }) => {
  let hintContent = '';
  let hintLabel = '';
  const platformPristine = worldPosition === FLAT;


  if (!showGMAL && platformPristine) {
    hintContent = 'find a lever';
    hintLabel = (<b className="dark">hint&nbsp;&nbsp;</b>);
  } else if (showGMAL && platformPristine) {
    hintContent = 'find a place to stand';
    hintLabel = (<b className="dark">hint&nbsp;&nbsp;</b>);
  } else {
    hintContent = 'move the world';
  };

  return (
    <p className="hint">
      {hintLabel}
      {hintContent}
    </p>
  );
}

export default Hint;
