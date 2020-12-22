import '@/assets/stylesheets/index.scss';

import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import data from '@/markup/data';
import App from '@/App';
import reducer from '@/store/reducer';
import api from '@/api';
import { Operation } from '@/store/data/data';

const store = createStore(
  reducer,
  composeWithDevTools(
      applyMiddleware(thunk.withExtraArgument(api)))
);

const init = () => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App/>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  );
};

store.dispatch(Operation.loadGlobalData())
  .then(() => store.dispatch(Operation.loadCountriesData()))
  .then(() => init());
