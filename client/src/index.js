import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import Board from './DnD/Board';


ReactDOM.render(<Board knightPosition={[0, 0]}/>, document.getElementById('root'));

// registerServiceWorker();
