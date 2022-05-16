import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import { connectReduxDevtools } from "mst-middlewares"

import RootStore from './store';

const store = RootStore.create({});

export const StoreContext = createContext(store);
connectReduxDevtools(require("remotedev"), store)

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
