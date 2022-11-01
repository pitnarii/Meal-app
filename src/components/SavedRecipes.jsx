import React from 'react';

import Meal1 from '../assets/meal1.jpeg';
import Meal2 from '../assets/meal2.jpeg';
import Meal3 from '../assets/meal3.jpeg';
import Meal4 from '../assets/meal4.jpeg';
import Meal5 from '../assets/meal5.jpeg';


const SavedRecipes = () => {
  return (
    <div name='savedrecipes' className='w-full md:h-screen text-gray-300 bg-[#22333B]'>
      <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
        <div className='pb-8'>
          <p className='text-4xl sm:text-7xl font-bold text-[#84C318]'> Saved Recipes  </p>
          <p className='py-6'> Text about saved recipes </p>
          <p className='py-1'> </p>
        </div>

{/* Container */}
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>

            {/* Grid Item */}
            <div
            style={{ backgroundImage: `url(${Meal4})` }}
            className='shadow-lg shadow-[#ffffff] group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className='opacity-0 group-hover:opacity-100'>
              <div className='mx-14 pt-8 text-center'>
                <a href=''>
                <button class="text-white group border-2 px-6 py-3 my-2 flex items-center hover:bg-green-600 hover:border-green-600">  Recipe title from API</button>
                </a>
                <a href='/'>
                </a>
              </div>
            </div>
          </div>  
            {/* Grid Item */}
            <div
            style={{ backgroundImage: `url(${Meal4})` }}
            className='shadow-lg shadow-[#ffffff] group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className='opacity-0 group-hover:opacity-100'>
              <div className='mx-14 pt-8 text-center'>
                <a href=''>
                <button class="text-white group border-2 px-6 py-3 my-2 flex items-center hover:bg-green-600 hover:border-green-600">  Recipe title from API</button>
                </a>
                <a href='/'>
                </a>
              </div>
            </div>
          </div>  
         
          {/* Grid Item */}
          <div
            style={{ backgroundImage: `url(${Meal4})` }}
            className='shadow-lg shadow-[#ffffff] group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className='opacity-0 group-hover:opacity-100'>
              <div className='mx-14 pt-8 text-center'>
                <a href=''>
                <button class="text-white group border-2 px-6 py-3 my-2 flex items-center hover:bg-green-600 hover:border-green-600">  Recipe title from API</button>
                </a>
                <a href='/'>
                </a>
              </div>
            </div>
          </div>   

          {/* Grid Item */}
          <div
            style={{ backgroundImage: `url(${Meal4})` }}
            className='shadow-lg shadow-[#ffffff] group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className='opacity-0 group-hover:opacity-100'>
              <div className='mx-14 pt-8 text-center'>
                <a href=''>
                <button class="text-white group border-2 px-6 py-3 my-2 flex items-center hover:bg-green-600 hover:border-green-600">  Recipe title from API</button>
                </a>
                <a href='/'>
                </a>
              </div>
            </div>
          </div>  

          {/* Grid Item */}
          <div
            style={{ backgroundImage: `url(${Meal4})` }}
            className='shadow-lg shadow-[#ffffff] group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className='opacity-0 group-hover:opacity-100'>
              <div className='mx-14 pt-8 text-center'>
                <a href=''>
                <button class="text-white group border-2 px-6 py-3 my-2 flex items-center hover:bg-green-600 hover:border-green-600">  Recipe title from API</button>
                </a>
                <a href='/'>
                </a>
              </div>
            </div>
          </div>   

          {/* Grid Item */}
          <div
            style={{ backgroundImage: `url(${Meal4})` }}
            className='shadow-lg shadow-[#ffffff] group container rounded-md flex justify-center items-center mx-auto content-div'
          >
            {/* Hover Effects */}
            <div className='opacity-0 group-hover:opacity-100'>
              <div className='mx-14 pt-8 text-center'>
                <a href=''>
                <button class="text-white group border-2 px-6 py-3 my-2 flex items-center hover:bg-green-600 hover:border-green-600">  Recipe title from API</button>
                </a>
                <a href='/'>
                </a>
              </div>
            </div>
          </div>  


        </div>
      </div>
    </div>
  );
};

export default SavedRecipes;