import React, { useState, useEffect, useRef, useContext } from "react";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Search from "./components/Search";
import Recipes from "./components/Recipes";
import Contact from "./components/Contact";
import Register from "./components/Register";
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import SavedRecipes from "./components/SavedRecipes";
import RecipeCard from "./components/RecipeCard";
import SearchContext from "./SearchContext";
import { useNavigate } from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import RecipeContext from "./RecipeContext";

function App() {
  const [userInfo, setUserInfo] = useState(null);

  console.log(userInfo);

  const checkIfLoggedIn = () => {
    fetch("http://localhost:3300/user/me", {
      headers: { "content-type": "application/json" },
      credentials: "include",
    })
      .then((result) => result.json())
      .then(setUserInfo);
  };

  const signOut = () => {
    fetch("http://localhost:3300/user/signout", {
      credentials: "include",
      headers: { "content-type": "application/json" },
    }).then(() => setUserInfo(null));
  };

  useEffect(() => {
    checkIfLoggedIn();
  }, []);



  const [recipes, setRecipes] = useState([])

  const navigate = useNavigate()


  const { searchAPI } = useContext(SearchContext);

  const initialRender = useRef(true);
  useEffect(() => {
      if (initialRender.current) {
          initialRender.current = false;
      } else {
          const getRecipes = async(api) => {fetch(api, {
              headers: { "content-type": "application/json" },
              credentials: "include",
              method: "get", 
              }).then(result => result.json())
              .then(result => setRecipes (result));

              console.log(recipes);
              if (recipes !== null){
                  navigate("/recipes");
              } else {console.log("No recipes")}
              };
          getRecipes(searchAPI)}}, [searchAPI]);
// for testing purposes without making API call
  // const recipes = [{"id": 644387, "name": "Garlicky Kale", "image": "https://spoonacular.com/recipeImages/644387", "price": "$138.18", "sourceUrl": "http://www.foodista.com/recipe/J2FTJBF7/garlicky-kale"}, {"id": 715594, "name": "Homemade Garlic and Basil French Fries", "image": "https://spoonacular.com/recipeImages/715594", "price": "$166.46", "sourceUrl": "http://www.pinkwhen.com/homemade-french-fries/"}, {"id": 798400, "name": "Spicy Black-Eyed Pea Curry with Swiss Chard and Roasted Eggplant", "image": "https://spoonacular.com/recipeImages/798400", "price": "$201.44", "sourceUrl": "http://foodandspice.blogspot.com/2016/08/spicy-black-eyed-pea-curry-with-swiss.html"}, {"id": 716627, "name": "Easy Homemade Rice and Beans", "image": "https://spoonacular.com/recipeImages/716627", "price": "$212.04", "sourceUrl": "http://cooking2perfection.blogspot.com/2012/11/easy-homemade-rice-and-beans.html"}, {"id": 716426, "name": "Cauliflower, Brown Rice, and Vegetable Fried Rice", "image": "https://spoonacular.com/recipeImages/716426", "price": "$224.78", "sourceUrl": "http://fullbellysisters.blogspot.com/2012/01/cauliflower-fried-rice-more-veggies.html"}, {"id": 794349, "name": "Broccoli and Chickpea Rice Salad", "image": "https://spoonacular.com/recipeImages/794349", "price": "$275.14", "sourceUrl": "http://foodandspice.blogspot.com/2016/07/broccoli-and-chickpea-rice-salad.html"}, {"id": 766453, "name": "Hummus and Za'atar", "image": "https://spoonacular.com/recipeImages/766453", "price": "$322.06", "sourceUrl": "http://foodandspice.blogspot.com/2016/03/hummus-with-zaatar.html"}, {"id": 640941, "name": "Crunchy Brussels Sprouts Side Dish", "image": "https://spoonacular.com/recipeImages/640941", "price": "$338.76", "sourceUrl": "http://www.foodista.com/recipe/LKJMG5RP/crunchy-brussels-sprouts"}, {"id": 782601, "name": "Red Kidney Bean Jambalaya", "image": "https://spoonacular.com/recipeImages/782601", "price": "$371.54", "sourceUrl": "http://foodandspice.blogspot.com/2016/05/red-kidney-bean-jambalaya.html"}, {"id": 715497, "name": "Berry Banana Breakfast Smoothie", "image": "https://spoonacular.com/recipeImages/715497", "price": "$408.58", "sourceUrl": "http://www.pinkwhen.com/berry-banana-breakfast-smoothie/"}]
  const { recipeInfoImage } = useContext(RecipeContext);
  // const { recipeInfoAPI } = useContext(RecipeContext);
  const { recipeInfoID } = useContext(RecipeContext);
  const { recipeInfoName } = useContext(RecipeContext);
  const { recipeInfo } = useContext(RecipeContext);

  return (
    <>
      <NavBar userInfo={userInfo} signOut={signOut} />
      <Routes>
        <Route
          path="/login"
          element={<Login checkIfLoggedIn={checkIfLoggedIn} />}
        />
        <Route path="/" element={<Home userInfo={userInfo} />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/register"
          element={<Register checkIfLoggedIn={checkIfLoggedIn} />}
        />
        <Route path="/welcome" element={<Welcome />} />
        <Route path ='/recipes' element ={<Recipes recipeData={recipes}/>} />
        <Route path="/savedrecipes" element={<SavedRecipes userInfo={userInfo} />} />
        <Route path="/recipecard" element={<RecipeCard name={recipeInfoName}
        image={recipeInfoImage} id={recipeInfoID} method={recipeInfo.instructions}
        ingredient={recipeInfo.ingredients}/>} />        
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
