import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import rootReducers from './components/store'

const store = createStore(
  rootReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store} >
      <App/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);