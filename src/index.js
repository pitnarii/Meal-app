import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { SearchProvider } from "./SearchContext";

ReactDOM.render(
  <SearchProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </SearchProvider>,
  document.getElementById('root')
);