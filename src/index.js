import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { SearchProvider } from "./SearchContext";
import { RecipeProvider } from "./RecipeContext";

ReactDOM.render(
  <SearchProvider>
    <RecipeProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </RecipeProvider>
  </SearchProvider>,
  document.getElementById('root')
);