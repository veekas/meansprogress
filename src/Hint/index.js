import React from 'react';

import { FLAT } from '../utils';

const Hint = ({ showGMAL, worldPosition }) => {
  let hintContent = '';
  const platformPristine = worldPosition === FLAT;

  if (!showGMAL && platformPristine) {
    hintContent = 'find a lever';
  } else if (showGMAL && platformPristine) {
    hintContent = 'find a place to stand';
  } else {
    hintContent = 'move the world';
  };

  return (
    <p className="hint">
      <b className="dark">➜&nbsp;&nbsp;</b>
      {hintContent}
    </p>
  );
}

export default Hint;
