import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './main-component/App/App';
import * as serviceWorker from './serviceWorker';
import './css/font-awesome.min.css';
import './css/themify-icons.css';
import './css/flaticon.css';
import Web3 from 'web3';
import { Web3ReactProvider } from '@web3-react/core';
import { ToastContainer } from 'react-toastify';

function getLibrary(provider) {
  const library = new Web3(provider);
  library.pollingInterval = 12000;
  return library;
}

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <App />
    <ToastContainer position="bottom-right" />
  </Web3ReactProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
