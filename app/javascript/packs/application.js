import React from 'react';
import ReactDOM from 'react-dom';
import '../components/index.css';
import App from '../components/App';
import registerServiceWorker from '../components/registerServiceWorker';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<App />, document.getElementById('root'));
});

registerServiceWorker();
