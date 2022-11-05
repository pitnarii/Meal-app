import { createContext, useState} from "react";

const RecipeContext = createContext()

export function RecipeProvider ({ children }) {

    const [recipeInfoImage, setRecipeInfoImage] = useState("");
    const [recipeInfoName, setRecipeInfoName] = useState("");
    const [recipeInfoID, setRecipeInfoID] = useState("");
    const [recipeInfoAPI, setRecipeInfoAPI] = useState("");
    const [recipeInfo, setRecipeInfo] = useState("");



    const getRecipeInfo = (id, image, name) => {
        setRecipeInfoAPI(`http://localhost:3300//user/${id}`);
        // console.log(recipeInfoAPI)
        setRecipeInfoImage(image);
        setRecipeInfoName(name);
        setRecipeInfoID(id);
         }

         

    const getRecipeDetails = async(api) => {
        console.log(api);
        const response = await fetch(api, {
        headers: { "content-type": "application/json" },
        credentials: "include",
        method: "get", 
        });
        console.log(response);
        const response2 = await response.json();
        setRecipeInfo(response2);
        console.log(response2);
        
};
     

    return (
        <RecipeContext.Provider value={{ recipeInfo, recipeInfoAPI, recipeInfoImage, recipeInfoID, recipeInfoName, getRecipeInfo, getRecipeDetails }}>
            { children }</RecipeContext.Provider>
    );
}


export default RecipeContext;