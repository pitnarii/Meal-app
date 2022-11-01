import React from "react";

const RecipeDiv = (props) => {

    return (
        <div style={{ backgroundImage: `url(${props.image})` }}
        
             className='shadow-lg shadow-[#ffffff] group container rounded-md flex justify-center items-center mx-auto content-div'>
             {/* Hover Effects */}
             <div className='opacity-0 group-hover:opacity-100'>
               <div className='mx-14 pt-8 text-center'>
                 <a href={props.sourceUrl}>
                 <button className="text-white group border-2 px-6 py-3 my-2 flex items-center rounded-lg hover:bg-red-400 hover:border-red-300">  { props.name }<br/>{ props.price } </button>
                 </a>
                 <a href='/'>
                 </a>
               </div>
             </div>
        //    </div>  
    );
}

export default RecipeDiv;