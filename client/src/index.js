import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { Provider } from 'react-redux';
// import store from './store';
// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>, 
  // <Provider store={store}>
  // <App/>
  // </Provider>,
  document.getElementById('root')
);
// reportWebVitals();/////
serviceWorker.unregister();
