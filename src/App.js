import NavBar from "./components/NavBar";
import Home from "./components/Home";
import About from "./components/About";

import Recipes from "./components/Recipes";
import Contact from "./components/Contact";
import React from 'react'





function App() {
  return (
    <div>
      <NavBar /> 
      <Home/> 
      <About/>
      <Recipes /> 
      <Contact /> 
    </div>
  );
}

export default App;
