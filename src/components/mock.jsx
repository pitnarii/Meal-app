

import React from 'react';

import Burger from '../assets/burger.jpg';
import Veggie from '../assets/veggie.jpg';
import Family from '../assets/family.jpg';

const About = () => {
  return (
    <div name='about' className='w-full h-screen bg-[#FFFFFF] text-gray-300'>
      {/* Container */}
      <div className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
          <div>
              <p className='text-4xl sm:text-7xl font-bold text-[#84C318]'>Take your pick </p>
              <p className='py-4'>Choose from over 20 delicious recipes</p>
              <p className='py-1'> More text about how it works here </p>
          </div>

          <div className='w-full grid grid-cols-2 sm:grid-cols-3 gap-4 text-center py-8'>
              <div className='shadow-md shadow-[#22333B] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={Burger} alt="HTML icon" />
                  <p className='my-4'>Rapid</p>
              </div>
              <div className='shadow-md shadow-[#22333B] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={Veggie} alt="HTML icon" />
                  <p className='my-4'>Veggie</p>
              </div>
              <div className='shadow-md shadow-[#22333B] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={Family} alt="HTML icon" />
                  <p className='my-4'>Family</p>
              </div>
              <div className='shadow-md shadow-[#22333B] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={Burger} alt="HTML icon" />
                  <p className='my-4'>Meat</p>
              </div>
              <div className='shadow-md shadow-[#22333B] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={Veggie} alt="HTML icon" />
                  <p className='my-4'>Cold</p>
              </div>
              <div className='shadow-md shadow-[#22333B] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={Family} alt="HTML icon" />
                  <p className='my-4'>Under £5</p>
              </div>
              <div className='shadow-md shadow-[#22333B] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={Burger} alt="HTML icon" />
                  <p className='my-4'>Gulten-free</p>
              </div>
              <div className='shadow-md shadow-[#22333B] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={Veggie} alt="HTML icon" />
                  <p className='my-4'>Dairy free</p>
              </div>
              <div className='shadow-md shadow-[#22333B] hover:scale-110 duration-500'>
                  <img className='w-20 mx-auto' src={Family} alt="HTML icon" />
                  <p className='my-4'>Something </p>
              </div>
           
             
              
          </div>
      </div>
    </div>
  );
};


export default About;