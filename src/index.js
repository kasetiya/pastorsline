// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import { Provider as ReduxProvider } from 'react-redux';
// import { store } from './redux/store';
// import { BrowserRouter as Router } from 'react-router-dom';
// import './index.css';


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <ReduxProvider store={store}>
//     <Router>
//       <App />
//     </Router>
//   </ReduxProvider>
// );


// index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose  } from 'redux';
import { legacy_createStore as createStore} from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers';
import App from './App';
import "./index.scss"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({ rootReducer }),
  composeEnhancers(
    applyMiddleware(thunk)
    )
);

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);

