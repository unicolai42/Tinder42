import React, { Component } from 'react';
import Square from './Square';
import Knight from './Knight';

export default class Board extends Component {
    constructor(props) {
        super(props)

        this.renderSquare = this.renderSquare.bind(this)
    }
    renderSquare(x, y) {
        const black = (x + y) % 2 === 1;
        
        const [knightX, knightY] = this.props.knightPosition;
        const piece = (x === knightX && y === knightY) ? <Knight /> : null
        console.log(piece)
        
        return (
            <Square black={black}>
                {piece}
            </Square>
        );
    }
  render() {
    return (
      <div>
        {this.renderSquare(0, 0)}
        {this.renderSquare(1, 0)}
        {this.renderSquare(2, 0)}
      </div>
    );
  }
}