import React from 'react';
import {TransitionMotion, spring} from 'react-motion';

const leavingSpringConfig = {stiffness: 60, damping: 15};

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {mouse: [], now: 't' + 0};

    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.willLeave = this.willLeave.bind(this);
  }

  handleMouseMove({pageX, pageY}){
    // Make sure the state is queued and not batched.
    this.setState(() => {
      return {
        mouse: [pageX - 25, pageY - 25],
        now: 't' + Date.now(),
      };
    });
  }

  handleTouchMove(e){
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  }

  willLeave(styleCell){
    return Object.assign({}, styleCell.style, {
      opacity: spring(0, leavingSpringConfig),
      scale: spring(2, leavingSpringConfig),
    });
  }

  render() {
    const {mouse: [mouseX, mouseY], now} = this.state;
    const styles = mouseX == null ? [] : [{
      key: now,
      style: {
        opacity: spring(1),
        scale: spring(0),
        x: spring(mouseX),
        y: spring(mouseY),
      }
    }];
    return (
      <TransitionMotion willLeave={this.willLeave} styles={styles}>
        {circles =>
          <div
            onMouseMove={this.handleMouseMove}
            onTouchMove={this.handleTouchMove}
            style={{
                width: '500px',
                height: '500px',
                backgroundColor: '#1B1B1B',
                position: 'relative',
            }}
          >
            {circles.map(({key, style: {opacity, scale, x, y}}) =>
              <div
                key={key}
                style={{
                    opacity: opacity,
                    scale: scale,
                    transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                    WebkitTransform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                    width: '50px',
                    height: '50px',
                    borderRadius: '99px',
                    position: 'absolute',
                    border: '1px solid lightblue',
                }} />
            )}
          </div>
        }
      </TransitionMotion>
    );
  };
}
