import frugalogo from "../assets/frugalogo.png";
import LandingPage from "../assets/LandingPage.jpg";
import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-scroll";
import { resolvePath } from "react-router-dom";
import Footer from "../components/Footer";

const Home = (props) => {
  console.log('home props', props);

  return (
    <div
      style={{
        backgroundImage: `url(${LandingPage})`,
        
      }}
      name="home"
      
      className="w-half h-screen bg-white bg-cover"

    >
   
    

        {props.userInfo && props.userInfo.isLoggedIn && (
          <div className="max-w-[1000px] ml-40 px-9 flex justify-center flex-col h-full">
            <h1 className="drop-shadow-[0_0_2px_rgba(255,255,255,1)] text-4xl font-barlow font-normal text-[#864540]">Hello {props.userInfo.name}</h1>
          </div>
        )}

        {/* Container */}

      <div className='max-w-[1000px] mx-auto px-8 flex flex-col bg-zinc-50 bg-opacity-80 justify-center h-full'>
        <h2 className='text-4xl sm:text-7xl font-bold text-red-400'>
         Frugal Chef
        </h2>
        <br/>
        <br/>
        <h2 className='text-4xl sm:text-7xl font-bold text-[#E07A72]'>

         The planner that helps you be a frugal chef. Create heathy meals without worrying about the money.
        </h2>
        </div>
        
        <div name='home' className='w-half h-screen bg-[#E07A72] '>
      <div className='max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full'>

        <br/>
      <h2 className='text-4xl sm:text-2lg font-bold italic text-[white]'>
        " You choose healthy and delicious recipes to suit your budget and taste"
        </h2>
        <p className='text-red-200 py-4 max-w-[700px]'>
          Glamour Magizine 
        </p>
        <br/>
        <h2 className='text-4xl sm:text-2lg font-bold italic mb-6 text-[white]'>
          "This website couldn't have come at a better time"
        </h2>
        <p className='text-red-200 py-4 max-w-[700px]'>

          The Guardian 
        </p>
      
        </div> 
        <div name='home' className='w-half h-5/6 bg-[white] '>
      <div className='max-w-[1000px] mx-auto px-8 flex flex-col justify-center h-full'>
        <h2 className='text-5xl sm:text-5xl font-bold italic text-[grey]'>
          Features 
        </h2>
        <p className='text-[#8892b0] py-4 max-w-[700px]'>
          text to fill
        </p>

        </div> 
        

      </div>
       <Footer/> 
      </div>
      </div> 

  );
};

export default Home;


