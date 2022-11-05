import React, { useContext } from "react";
import AddSaved from "./AddSaved";
import RecipeContext from "../RecipeContext";
import { useNavigate } from "react-router-dom";

const RecipeDiv = (props) => {
  const { getRecipeInfo } = useContext(RecipeContext);

  const { recipeInfoAPI } = useContext(RecipeContext);

  const { getRecipeDetails } = useContext(RecipeContext);
  const navigate = useNavigate();

  const getID = async (e) => {
    e.preventDefault();
    await getRecipeInfo(props.id, props.image, props.name);

    console.log(recipeInfoAPI)
    await getRecipeDetails(recipeInfoAPI);
    navigate('/recipecard');
  }
 
    const getRecipeID = (e) => {
        e.preventDefault();
        let api = `http://localhost:3300/user/save_recipe/${props.id}/${props.image}/${props.name}`
        console.log(api);
        fetch(api, {
        headers: { "content-type": "application/json" },
        credentials: "include",
      })
        .then((result) => result.json())
        .then((result) => {
          console.log(result.message)
          alert(result.message)
        }
        );
    };

    return (
      <div
      style={{ backgroundImage: `url(${props.image})` }}
      className='shadow-lg shadow-[#ffffff] group container rounded-md flex justify-center items-center mx-auto content-div'
    >  
      {/* Hover Effects */}
      <div className='opacity-0 group-hover:opacity-100'>
        <div className='mx-14 pt-8 text-center'>
         
          <button onClick={getID} class="text-white group border-2 px-6 py-3 my-2 flex items-center rounded-lg hover:bg-red-400 hover:border-red-300">  { props.name }<br/>{ props.price }</button>
          <span onClick={getRecipeID}><AddSaved /></span> 
          <a href='/'>
          </a>
        </div>
     
      </div>   
    </div>  

  );
}

export default RecipeDiv;