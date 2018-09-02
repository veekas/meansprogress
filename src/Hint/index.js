import React from 'react';

import { FLAT } from '../utils';
import './styles.css';

const Hint = ({ platformAngle, previousView, showGMAL }) => {
  let hintContent = '';
  let hintLabel = null;
  const platformPristine = platformAngle === FLAT && !previousView;


  if (!showGMAL && platformPristine) {
    hintContent = 'click the logo';
    hintLabel = (<span className='font-weight-bold'>hint</span>);
  } else if (showGMAL && platformPristine) {
    hintContent = 'click the platform';
    hintLabel = (<span className='font-weight-bold'>hint</span>);
  };

  return <p className="hint">{hintLabel} <span className="font-weight-light">{hintContent}</span></p>;
}

export default Hint;
