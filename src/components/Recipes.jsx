import React from 'react';
import RecipeDiv from './RecipeDiv';


const Recipes = (props) => {


  function createRecipe(recipe) {
      return (
        <RecipeDiv
          key={recipe.id}
          id={recipe.id}
          name={recipe.name}
          image={recipe.image}
          price={recipe.price}
          sourceUrl={recipe.sourceUrl}
        />
      );
    }
  


return (
    <div name='savedrecipes' className='w-full md:h-screen text-gray-300 bg-[#FFFFFF]'>
    <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
   <br/> 
      <br />
      <br/> 
      <h2 className='text-4xl sm:text-7xl font-bold text-[#E07A72]'>
        Searched Recipes
      </h2>
          {/* Commenting this out not sure if a button is needed?<div class="container py-10 px-50 mx-0 min-w-full flex flex-col items-center"><h1 class="bg-[#E07A72] hover:bg-orange-500 text-white py-2 px-4 h-30 w-80 text-center font-medium text-l rounded focus:outline-none focus:shadow-outline">Recipes</h1></div>*/}
       
     

{/* Container */}
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
       
            {/* Grid Item */}
            {props.recipeData.map(createRecipe)}
          </div>
    </div>
  </div>
);
};

export default Recipes;

         


