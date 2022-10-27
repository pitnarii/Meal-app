//add state so can toggle navbar
import FrugalChefResized from '../assets/FrugalChefResized.png';
import React, { useState } from 'react'
import {
  FaBars,
  FaTimes,
 
} from 'react-icons/fa';

import {Link} from 'react-router-dom'



const NavBar = () => {
  // take two values default value false
  const [nav, setNav] = useState(false)
  //click function (arrow function) set current value to nav
  const handleClick = () => setNav(!nav)
  return (
    <div className='fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#FFFFFF] text-orange-700 font-barlow'>

<img src={FrugalChefResized} alt="app__logo" height='105px' width='281px' />

      


      {/* menu */}
      <ul className='hidden md:flex'>
        <li> 
          <a href='/'>Home</a>
          </li>
        <li> 
        <a href='/about'>About</a>
        </li>
        <li> 
        <a href='/register'>Register</a>
        </li>
        <li> 
        <a href='/search'>Search</a>
        </li>
        <li> 
        <a href='/welcome'>Welcome</a>
           </li>
        <li> 
        <a href='/recipes'>Recipes</a>
        </li>
        <li> 
        <a href='/contact'>Contact</a> </li>
      </ul>

    
       
       
      
    

      {/* hamburger menu */}

      <div onClick={handleClick} className='md:hidden z-10'>
        {!nav ? <FaBars /> : <FaTimes />}
      </div>

      {/* mobile menu */}

      {/* t operator, check value of nav */}
      <ul className={!nav ? 'hidden' : 'absolute top-0 left-0 w-full h-screen bg-[#0b090a] flex flex-col justify-center items-center'}>

        <li className='py-6 text-4xl'> 
        <a href ='/'>Home</a>
        </li>
        <li className='py-6 text-4xl'> 
        <a href ='/about'>About</a>
        </li>
        
        <li className='py-6 text-4xl'>
        <a href ='/register'>Register</a>
         </li>

         <li className='py-6 text-4xl'>
        <a href ='/search'>Search</a>
         </li>

        <li className='py-6 text-4xl'> 
        <a href ='/welcome'>Welcome</a>
         </li>
        <li className='py-6 text-4xl'> 
        <a href ='/recipes'>Recipes</a></li> 

        <li className='py-6 text-4xl'> 
        <a href ='/contact'>Contact</a></li> 

      </ul>

      {/* social icons */}
      <div className='hidden lg:flex fixed flex-col top-[35%] left-0'>
        <ul>
          

        </ul>

      </div>


    </div>



  )
}

export default NavBar