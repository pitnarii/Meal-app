

import React, { useState, useContext } from 'react';
import SearchContext from '../SearchContext';


const Search = () => {


  const { getSearchAPI } = useContext(SearchContext);


  const [formData, setFormData] = useState(
      {
          diet: "", 
          intolerances: [], 
          persons: "1", 
          budget: "999999"
      }
  );


  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
      getSearchAPI(formData);
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
<option value="999999">Select Budget</option>
 <option value="2000">$20</option>
<option value="5000">$50</option>
<option value="10000">$100</option>
<option value="100000">$100+</option>
</select>

<br />

<label for="people" className="block mb-2 text-sm font-medium text-red-400">Select Number of People</label>
<select id="people" name="persons" value={formData.persons} onChange={handleChange} className="bg-neutral-50 border border-neutral-300 text-gray-400 text-sm rounded-lg focus:ring-red-300 focus:border-red-400 block w-full p-2.5">
{/* <option value="1">Select Number</option> */}
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
</select>

<br />

<label for="diet" className="block mb-2 text-sm font-medium text-red-400">Dietary Requirements</label>
<select id="diet" name="diet" value={formData.diet} onChange={handleChange} className="bg-neutral-50 border border-neutral-300 text-gray-400 text-sm rounded-lg focus:ring-red-300 focus:border-red-400 block w-full p-2.5">
<option value="">Select Type</option>
<option value="Gluten Free">Gluten-Free</option>
<option value="Vegetarian">Vegetarian</option>
<option value="Vegan">Vegan</option>
<option value="Ketogenic">Ketogenic</option>
<option value="Paleo">Paleo</option>
<option value="Pescatarian">Pescatarian</option>
</select>


  <br />

  <label for="allergies" class="block mb-2 text-sm font-medium text-red-400">Allergies ~ To Select more than one, click Command+Click or CTRL+Click ~</label>
  <select multiple id="countries_multiple" name="intolerances" value={formData.intolerances} onChange={handleChange}  className="bg-neutral-50 border border-neutral-300 text-gray-400 text-sm rounded-lg focus:ring-red-300 focus:border-red-400 block w-full p-2.5">
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

  <div className="flex justify-center"> <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#C6480C] rounded-md hover:bg-orange-500 focus:outline-none focus:bg-purple-600">
      Search
      </button>
    </div>
    </form>
          </div>


      </div>



  
   
  );
};


export default Search;
