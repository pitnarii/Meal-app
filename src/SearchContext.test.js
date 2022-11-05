import { render } from '@testing-library/react';
import { useContext } from 'react';
import SearchContext, { SearchProvider } from './SearchContext';

const TestingComponent = () =>{
    const { searchAPI, setSearchAPI} = useContext(SearchContext);
    return (
        <>
            <p>{searchAPI?.Intolerances}</p>
            <p>{setSearchAPI?.toString()}</p>
         </>
    );
};
// const { getSearchAPI } = require('./SearchContext');

const dietary = {
    diet: "Vegan" 
};

describe('<SearchContext.Provider />', () => {
    test('provides expected diet preference search to child elements', () =>{
        [
            {
                diet: "Vegan", 
                expectedIntolerances: ['Egg', 'Seafood', 'Shellfish', 'Dairy']
                // persons: "1", 
                // budget: "50"
            }
        ].forEach(({ diet, expectedIntolerances, persons, budget }) => {

   
        const { getByTestedId } = render (
            <SearchContext.Provider>
                <SearchContext.Provider />
            </SearchContext.Provider>,
        );

            // const dietary = getByTestedId('diet');
                
            // expect(dietary.textContext).toEqual(persons)
            // expect(dietary.textContext).toEqual(budget)
            expect.arrayContaining(expectedIntolerances)

        });
    });
});
