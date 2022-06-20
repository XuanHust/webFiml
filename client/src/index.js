import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './stores/reducers/rootReducer';

const root = ReactDOM.createRoot(document.getElementById('root'));

const reduxStore = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

root.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </React.StrictMode>
);

