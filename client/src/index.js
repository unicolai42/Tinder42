import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// import Board from './DnD/Board';
// import { observe } from './DnD/Game';

// const rootEl = document.getElementById('root');

// observe(knightPosition =>
//   ReactDOM.render(
//     <Board knightPosition={knightPosition} />,
//     rootEl
//   )
// );


ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
