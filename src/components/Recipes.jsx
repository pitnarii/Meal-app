import React from 'react';
import RecipeDiv from './RecipeDiv';




const Recipes = (props) => {
    console.log(props.recipeData)


    function createRecipe(recipe) {
        return (
          <RecipeDiv
            key={recipe.id}
            name={recipe.name}
            image={recipe.image}
            price={recipe.price}
            sourceUrl={recipe.sourceUrl}
          />
        );
      }
    


  return (
    <div name='recipes' className='w-full md:h-screen text-gray-300 bg-[#FFFFFF]'>
      <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
        <div className='pb-8'>
          <div className="container py-10 px-50 mx-0 min-w-full flex flex-col items-center"><h1 className="bg-[#E07A72] hover:bg-orange-500 text-white py-2 px-4 h-30 w-80 text-center font-medium text-l rounded focus:outline-none focus:shadow-outline">Recipes</h1></div>
       
        </div>

        {/* Container */}
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>

             {/* Grid Item */}
             <div>{props.recipeData.map(createRecipe)}</div>

            </div>
      </div>
    </div>
  );
};

export default Recipes;

           