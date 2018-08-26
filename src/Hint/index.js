import React from 'react';

import { FLAT } from '../utils';

const Hint = ({ platformAngle, previousView, showGMAL }) => {
  let hintContent = '';
  let hintLabel = null;
  const platformPristine = platformAngle === FLAT && !previousView;


  if (!showGMAL && platformPristine) {
    hintContent = 'find a lever';
    hintLabel = (<b>hint&nbsp;</b>);
  } else if (showGMAL && platformPristine) {
    hintContent = 'find a place to stand';
    hintLabel = (<b>hint&nbsp;</b>);
  };

  return <p className="hint">{hintLabel} {hintContent}</p>;
}

export default Hint;
