import React, { useContext } from 'react';
import RecipeContext from '../RecipeContext';
import { Link } from "react-router-dom"

import AddSaved from './AddSaved';






const RecipeCard = () => {

  const { recipeInfo } = useContext(RecipeContext);
  const { recipeInfoImage } = useContext(RecipeContext);
  const { recipeInfoID } = useContext(RecipeContext);
  const { recipeInfoName } = useContext(RecipeContext);

  const getRecipeID = (e) => {
    e.preventDefault();
    let api = `http://localhost:3300/user/save_recipe/${recipeInfoID}/${recipeInfoImage}/${recipeInfoName}`
    console.log(api);
    fetch(api, {
    headers: { "content-type": "application/json" },
    credentials: "include",
  })
    .then((result) => result.json())
    .then((result) => {
      console.log(result.message)
      alert(result.message)
    }
    );
};


  return (
      <div name='savedrecipes' className='w-full md:h-screen text-gray-300 bg-[#FFFFFF]'>
      <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
     <br/> 
        <br />
        <br/> 
       
        <div class="flex justify-end"> <Link to="/search"><button class="  text-white font-bold  px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#C6480C] rounded-md hover:bg-orange-500 focus:outline-none focus:bg-purple-600">
          Back to search
              </button></Link>
            </div>
             <br /> 
           
        <div
            style={{ backgroundImage: `url(${recipeInfoImage})` }}
            className='shadow-lg shadow-[#ffffff] group container rounded-md flex justify-center items-center mx-auto content-div'
          >  <h2 className='text-4xl sm:text-7xl font-bold text-[#FFFFFF]'>
          {recipeInfoName}
        </h2></div>

        <h2 class=" text-pink-400 text-sm rounded-lg focus:ring-red-300 focus:border-red-400 block w-full p-2.5">
         <p> </p> 
         <br/> 
         <p>Ingredients: </p><br />  
         {recipeInfo.ingredients.map((ingredient, index) =>
            <li key={index}>
              {ingredient}
             </li>
)}
         <br />
         <p>Method: <br /><br />  {recipeInfo.instructions}</p> 
         <br />
         
        </h2>

        <br />
  
          <br />
  
          <div class="flex justify-center"> <button class=" px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#C6480C] rounded-md hover:bg-orange-500 focus:outline-none focus:bg-purple-600">
          <span onClick={getRecipeID}><AddSaved /></span>
              </button>
            </div>
             <br /> 
  
        </div>

  
      </div>
     
    );
  };
  
  
export default RecipeCard;