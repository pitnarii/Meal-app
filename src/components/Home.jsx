

import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import {Link} from 'react-scroll'




const Home = () => {
  return (

    <div style={{ backgroundImage:`url(${LandingPage})`,backgroundRepeat:"no-repeat",backgroundSize:"100%"}} name='home' className='w-half h-screen bg-white'>
    
    {/* Container */}
      <div className='max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full'>
        <h1 className='text-4xl sm:text-7xl font-bold text-[#ffffff]'>
         First title homepage, hello!
        </h1>
        <h2 className='text-4xl sm:text-7xl font-bold text-[#84C318]'>
          Second title homepage
        </h2>
        <p className='text-[#8892b0] py-4 max-w-[700px]'>
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>

        
        <div className='max-w-[1000px] grid sm:grid-cols-2'>
          <div className='max-w-[1000px] w-full grid grid-cols-2 '>
          <Link to="Blog" smooth={true} duration={500}>
            <button className='text-white group border-2 px-6 py-3 flex items-center hover:bg-green-600 hover:border-green-600'>
             Search Recipes 
            </button>
          </Link>
          </div>

          
        </div>
      </div>

    </div>
  );
};

export default Home;







