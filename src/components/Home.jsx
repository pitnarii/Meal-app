
import frugalogo from '../assets/frugalogo.png';
import LandingPage from '../assets/LandingPage.jpg';
import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import {Link} from 'react-scroll'

 


const Home = () => {
  return (

    <div style={{ backgroundImage:`url(${LandingPage})`,backgroundRepeat:"no-repeat",backgroundSize:"100%"}} name='home' className='w-half h-screen bg-white'>

      {/* Container */}
      <div  className='max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full'>
      <div className='max-w-[1000px] ml-60 px-8 flex justify-center flex-col h-full'>
      <img src={frugalogo} alt="app__logo" height='216px' width='163px' />
      </div>

      <div className='max-w-[1000px] ml-40 px-9 flex justify-center flex-col h-full'>
        <h2 className='text-3xl font-barlow font-normal text-[#864540]'>
        The planner that turns < br/> you into a FrugalChef - < br/>create a meal that's yummy < br/>without worrying  about money!
       
       </h2>
        <p className=' text-lg text-[#864540] py-14 max-w-[700px]'>
        Choose delicious recipes to suit all tastes and FrugalChef will < br/>tell you the their cost!
        </p>
        </div>
       

        
        <div className='max-w-[1000px] grid md:grid-cols-2'>
          <div className='max-w-[1000px] py-4 scale-110 flex flex-col h-full'>
          <Link to="Blog" smooth={true} duration={500}>
          <button class="bg-[#E07A72] hover:bg-orange-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">Contact Us</button>
          </Link>
          </div>

          
        </div>
      </div>

    </div>
  );
};

export default Home;







