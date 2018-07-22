import React, { Component } from 'react';

export default class Square extends Component {
  render() {
    const { black } = this.props;
    const fill = black ? 'black' : 'white';
    const stroke = black ? 'white' : 'black';
console.log(stroke)
    return (
        <div style={{
            backgroundColor: fill,
            color: stroke,
            width: '30px',
            height: '30px',
            display: 'flex'
          }}>
            {this.props.children}
        </div>
    )
  }
}