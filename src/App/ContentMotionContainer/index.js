import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';

import Content from './Content';
import GiveMeALever from './GiveMeALever';

import './index.css';

import {
  LEFT_VIEW, MAIN_VIEW, RIGHT_VIEW,
  FLAT, ROTATE_LEFT, ROTATE_RIGHT,
  TRANSLATE_WORLD_LEFT, TRANSLATE_WORLD_RIGHT,
  TRANSLATE_TEXT_RIGHT, TRANSLATE_TEXT_LEFT,
  TEXT_SPRING, WORLD_SPRING,
} from '../../utils';

export default class ContentMotionContainer extends Component {
  initialState = { previousView: null, view: MAIN_VIEW }
  state = this.initialState;

  moveTheWorld = () => {
    const { previousView, view } = this.state;

    let nextView = null;
    if (view === LEFT_VIEW) {
      nextView = MAIN_VIEW;
    } else if (view === RIGHT_VIEW) {
      nextView = MAIN_VIEW;
    } else if (previousView === LEFT_VIEW) {
      nextView = RIGHT_VIEW;
    } else {
      nextView = LEFT_VIEW;
    }

    this.setState(
      { previousView: view, view: nextView },
      window.scrollTo(0,document.body.scrollHeight),
    );
  }

  render() {
    const { previousView, view } = this.state;
    const { showGMAL } = this.props;

    let rotateAngle = FLAT;
    let translateText = FLAT;
    let translateWorld = FLAT;
    if (view === RIGHT_VIEW) {
      rotateAngle = ROTATE_RIGHT;
      translateText = TRANSLATE_TEXT_RIGHT;
      translateWorld = TRANSLATE_WORLD_RIGHT;
    } else if (view === LEFT_VIEW) {
      rotateAngle = ROTATE_LEFT;
      translateText = TRANSLATE_TEXT_LEFT;
      translateWorld = TRANSLATE_WORLD_LEFT;
    };

    return (
      <Motion
        style={{
          rotateVal: spring(rotateAngle),
          translateWorld: spring(translateWorld, WORLD_SPRING),
          translateText: spring(translateText, TEXT_SPRING),
        }}
      >
        {style => {
          const rotate = `rotate(${style.rotateVal}deg)`;
          const transformRotate = { transform: rotate };

          const moveText = `translateX(${style.translateText}vw)`
          const transformText = { transform: moveText };

          const worldFall = `translateX(${style.translateWorld}vh)`
          const transformWorld = { transform: `${rotate} ${worldFall}` };

          return (
            <div className="motion-container">
              <Content style={transformText} />
              <GiveMeALever
                moveTheWorld={this.moveTheWorld}
                rotateAngle={rotateAngle}
                rotate={transformRotate}
                transformWorld={transformWorld}
                showGMAL={showGMAL}
                previousView={previousView}
              />
            </div>
          );
        }}
      </Motion>
    );
  }
}
