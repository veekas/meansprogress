import React from 'react';

import Bio from './Bio';
import Main from './Main';
import Skills from './Skills';

import './styles.css';

export default class Content extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.style.transform !== this.props.style.transform;
  }

  render() {
    const { style } = this.props;

    return (
    <div className="content-container" style={style}>
      {/*<Skills />*/}
      <Main />
      {/*<Bio />*/}
    </div>
  );
  }
}
