import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Principal } from "./components/Principal";
import reportWebVitals from './reportWebVitals';
import "bootswatch/dist/lux/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <Principal />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();