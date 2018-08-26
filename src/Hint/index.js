import React from 'react';

import { FLAT } from '../utils';

const Hint = ({ platformAngle, previousView, showGMAL }) => {
  let hintContent = '';
  let hintLabel = null;
  const platformPristine = platformAngle === FLAT && !previousView;


  if (!showGMAL && platformPristine) {
    hintContent = 'find a lever';
    hintLabel = (<span className='font-weight-bold'>hint</span>);
  } else if (showGMAL && platformPristine) {
    hintContent = 'find a place to stand';
    hintLabel = (<span className='font-weight-bold'>hint</span>);
  };

  return <p className="hint">{hintLabel} <span className="font-weight-light">{hintContent}</span></p>;
}

export default Hint;
