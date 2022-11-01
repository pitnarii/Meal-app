import { createContext, useState } from "react";

const SearchContext = createContext()

export function SearchProvider ({ children }) {

    const [searchAPI, setSearchAPI] = useState("");

    const getSearchAPI = (formData) => {
        setSearchAPI(`http://localhost:3300/search_recipe?diet=${formData.diet}&intolerances=${formData.intolerances}&persons=${formData.persons}&budget=${formData.budget}`);
         }

    return (
        <SearchContext.Provider value={{ searchAPI, getSearchAPI }}>
            { children }</SearchContext.Provider>
    );
}


export default SearchContext;