//add state so can toggle navbar
import FrugalChefResized from "../assets/FrugalChefResized.png";
import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import { Link } from "react-router-dom";

const NavBar = (props) => {
  // take two values default value false
  const [nav, setNav] = useState(false);
  //click function (arrow function) set current value to nav
  const handleClick = () => setNav(!nav);

  console.log(props.userInfo);

  const isLoggedIn = props.userInfo && props.userInfo.isLoggedIn;

  return (
    <div className="fixed w-full h-[80px] flex justify-between items-center px-4 bg-[#FFFFFF] text-orange-700 font-barlow">
      <img
        src={FrugalChefResized}
        alt="app__logo"
        height="105px"
        width="281px"
      />

      {/* menu */}
      <ul className="hidden md:flex">
        {!isLoggedIn && (
          <li>
            <a href="/login">Login</a>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <a href="#" onClick={props.signOut}>
              Log out
            </a>
          </li>
        )}
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/search">Search</a>
        </li>
        {/* {!isLoggedIn && (
          <li>
            <a href="/register">Register</a>
          </li>
        )} */}
        {/* <li>
          <a href="/welcome">Welcome</a>
        </li> */}
       
        <li>
          <a href="/savedrecipes">Saved Recipes</a>
        </li>
        {/* <li>
          <a href="/recipecard">Recipe</a>
        </li> */}
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
      <a href="/register">
      <button class="bg-[#E07A72] hover:bg-orange-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Sign-up
      </button>
      </a> 
      {/* hamburger menu */}

      <div onClick={handleClick} className="fixed bottom-4 right-4 rounded-full px- py6 md:hidden z-50">
      
      <button class="w-14 h-14 relative text-white focus:outline-none bg-[#E07A72] rounded">

        <span>Menu</span>
        </button>
      </div>


      {/* mobile menu */}

      {/* t operator, check value of nav */}
      <ul
        className={
          !nav
            ? "hidden"
            : "absolute top-0 left-0 w-full h-screen bg-[#E07A72] flex flex-col justify-center items-center"
        }
      >
        <li className="py-6 text-white text-2xl">
          <a href="/">Home</a>
        </li>
        <li className="py-6 text-white text-2xl">
          <a href="/search">Search</a>
        </li>
        <li className="py-6 text-white text-2xl">
          <a href="/login">Login</a>
        </li>
        

        <li className="py-6 text-white text-2xl">
          <a href="/savedrecipes">Saved Recipes</a>
        </li>
        <li className="py-6 text-white text-2xl">
          <a href="/contact">Contact</a>
        </li>
      </ul>

      {/* social icons */}
      <div className="hidden lg:flex fixed flex-col top-[35%] left-0">
        <ul></ul>
      </div>
    </div>
  );
};

export default NavBar;
