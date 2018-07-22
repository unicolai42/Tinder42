import React, { Component } from 'react';
import BoardSquare from './BoardSquare';
import Knight from './Knight';
import { moveKnight, canMoveKnight } from './Game';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Board extends Component {
    constructor(props) {
        super(props)

        this.renderSquare = this.renderSquare.bind(this)
    }
    renderSquare(i) {
        const x = i % 8;
        const y = Math.floor(i / 8);
        return (
          <div key={i}
               style={{ width: '12.5%', height: '12.5%' }}>
            <BoardSquare x={x}
                         y={y}>
              {this.renderPiece(x, y)}
            </BoardSquare>
          </div>
        );
      }

    handleSquareClick(toX, toY) {
        if (canMoveKnight(toX, toY))
            moveKnight(toX, toY);
    }
        
    renderPiece(x, y) {
        const [knightX, knightY] = this.props.knightPosition;
        if (x === knightX && y === knightY) {
            return <Knight />;
        }
    }

    render() {
        const squares = [];
        for (let i = 0; i < 64; i++) {
        squares.push(this.renderSquare(i));
        }
        return (
        <div style={{
            width: '250px',
            height: '100%',
            display: 'flex',
            flexWrap: 'wrap'
        }}>
            {squares}
        </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(Board);