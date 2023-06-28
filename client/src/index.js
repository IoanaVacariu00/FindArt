import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import CssBaseline from '@mui/material/CssBaseline';

ReactDOM.render(
  <React.StrictMode> 
    {/* <CssBaseline>   */}
      <App /> 
    {/* </CssBaseline> */}
   
  </React.StrictMode>, 

  document.getElementById('root')
);

serviceWorker.unregister();
