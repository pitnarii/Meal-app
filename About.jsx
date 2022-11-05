

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Recipes from './Recipes';




const About = () => {

    const navigate = useNavigate()

    const [searchAPI, setSearchAPI] = useState("");

    const [formData, setFormData] = useState(
        {
            diet: "", 
            intolerances: [], 
            persons: "", 
            budget: ""
        }
    );

    const [recipes, setRecipes] = useState([])

    // const [makeCall, setMakeCall] = useState(false)
  
    // useEffect(() => {
    
        // const getRecipes = (api) => {fetch(api, {
        //     headers: { "content-type": "application/json" },
        //     credentials: "include",
        //     method: "get", 
        //     }).then((result) => result.json())
        //     .then((result) => {setRecipes(result);
        //     console.log(result);
        //     console.log(recipes);});
        //     {<Recipes recipeData={recipes} />}
        //     navigate("/recipes");
        //     };
        // getRecipes(searchAPI)}, [searchAPI]);

    const getRecipes = api => {fetch(api, {
        headers: { "content-type": "application/json" },
        credentials: "include",
        method: "get", 
        }).then(result => result.json())
        .then(data => data ? setRecipes(data) : console.log("No API call"));
        // console.log(data);
        console.log(recipes);
        // not sure the code below is valid as per passing props to component like this
        {<Recipes recipeData={recipes} />};
        recipes && navigate("/recipes");
        };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchAPI(`http://localhost:3300/search_recipe?diet=${formData.diet}&intolerances=${formData.intolerances}&persons=${formData.persons}&budget=${formData.budget}`);
        // console.log(formData);
        console.log(searchAPI);
        getRecipes(searchAPI)     
    }

    const handleChange = (e) => {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        })};


    return (
            <div name='about' className='w-full h-screen bg-[#FFFFFF] text-gray-300'>
            {/* Container */}
            <div  className='max-w-[1000px] mx-auto p-4 flex flex-col justify-center w-full h-full'>
            <form onSubmit={handleSubmit}>
            <label for="budget" className="block mb-2 text-sm font-medium text-red-400">Select Budget</label>
            <select id="budget" name="budget" value={formData.budget} onChange={handleChange} className="bg-neutral-50 border border-neutral-300 text-gray-400 text-sm rounded-lg focus:ring-red-300 focus:border-red-400 block w-full p-2.5">
            <option value="">Select your budget</option>
            <option value="2000">$20</option>
            <option value="5000">$50</option>
            <option value="10000">$100</option>
            <option value="100000">$100+</option>
            </select>

            <br />

            <label for="people" className="block mb-2 text-sm font-medium text-red-400">Select Number of People</label>
            <select id="people" name="persons" value={formData.persons} onChange={handleChange} className="bg-neutral-50 border border-neutral-300 text-gray-400 text-sm rounded-lg focus:ring-red-300 focus:border-red-400 block w-full p-2.5">
            <option value="">Select number of persons</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            </select>

            <br />

            <label for="diet" className="block mb-2 text-sm font-medium text-red-400">Dietary Requirement</label>
                <select id="countries_multiple" name="diet" value={formData.diet} onChange={handleChange} className="bg-neutral-50 border border-neutral-300 text-gray-400 text-sm rounded-lg focus:ring-red-300 focus:border-red-400 block w-full p-2.5">
                    <option value="">Select a dietary requirement</option>
                    <option value="Gluten Free">Gluten-Free</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Ketogenic">Ketogenic</option>
                    <option value="Paleo">Paleo</option>
                    <option value="Pescatarian">Pescatarian</option>
                </select>

                <br />

                <label for="allergies" className="block mb-2 text-sm font-medium text-red-400">Allergies ~ To Select more than one, click Command+Click or CTRL+Click ~</label>
                <select multiple id="countries_multiple" name="intolerances" value={formData.intolerances} onChange={handleChange} className="bg-neutral-50 border border-neutral-300 text-gray-400 text-sm rounded-lg focus:ring-red-300 focus:border-red-400 block w-full p-2.5">
                    <option value={[]}>None</option>
                    <option value="Egg">Egg</option>
                    <option value="Gluten">Gluten</option>
                    <option value="Grain">Grain</option>
                    <option value="Seafood">Seafood</option>
                    <option value="Shellfish">Shellfish</option>
                    <option value="Sesame">Sesame</option>
                    <option value="Soy">Soy</option>
                    <option value="Sulfite">Sulfite</option>
                    <option value="TreeNuts">Tree Nuts</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Dairy">Dairy</option>
                </select>

                <br />

                <div className="flex justify-center"> <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#C6480C] rounded-md hover:bg-orange-500 focus:outline-none focus:bg-purple-600" >Search
                    </button></div>
                    </form>
                    </div>
                </div>    
        );
        };
        

export default About;