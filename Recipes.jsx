import React from 'react';


// import Meal44 from '../assets/meal44.jpg';
// import Meal45 from '../assets/meal45.jpg';
// import Meal46 from '../assets/meal46.jpg';
// import Meal47 from '../assets/meal47.jpg';
// import Meal48 from '../assets/meal48.jpg';

// import Meal50 from '../assets/meal50.jpg';

// import Meal44 from '../assets/meal1.jpeg';
// import Meal45 from '../assets/meal2.jpeg';
// import Meal46 from '../assets/meal3.jpeg';
// import Meal47 from '../assets/meal4.jpeg';
// import Meal48 from '../assets/meal5.jpeg';
// import Meal50 from '../assets/meal5.jpeg';







const Recipes = (props) => {

    const recipes = data => {data.isArray &&
       data.map(recipe => {
            {/* Grid Item */}
            <div
            style={{ backgroundImage: `url(${recipe.image})` }}
            className='shadow-lg shadow-[#ffffff] group container rounded-md flex justify-center items-center mx-auto content-div'>
            {/* Hover Effects */}
            <div className='opacity-0 group-hover:opacity-100'>
              <div className='mx-14 pt-8 text-center'>
                <a href={recipe.sourceUrl}>
                <button className="text-white group border-2 px-6 py-3 my-2 flex items-center rounded-lg hover:bg-red-400 hover:border-red-300">  { recipe.name } </button>
                </a>
                <a href='/'>
                </a>
              </div>
            </div>
          </div>  
    });
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
            {recipes(props.recipeData)}

            </div>
      </div>
    </div>
  );
};

export default Recipes;

           