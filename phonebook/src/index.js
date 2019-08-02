import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const names = [
  {
    name: 'Jeff Smith',
	number: '571-888-8880'
  },
  {
    name: 'Eric Randall',
	number: '571-888-6669'
  }
]

ReactDOM.render(<App names={names}/>, document.getElementById('root'));