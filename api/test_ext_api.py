import unittest
from unittest.mock import MagicMock, patch
from ext_api import search_recipe2, find_recipe_api2
import json


class TestExternalAPI(unittest.TestCase):
    recipe_data = [
        {"id": 715594, "name": "Homemade Garlic and Basil French Fries", 
        "image": "https://spoonacular.com/recipeImages/715594-312x231.jpg",
         "price": 83.23, 
         "sourceUrl": "http://www.pinkwhen.com/homemade-french-fries/"}, 
         {"id": 716426, 
         "name": "Cauliflower, Brown Rice, and Vegetable Fried Rice", 
         "image": "https://spoonacular.com/recipeImages/716426-312x231.jpg", 
         "price": 112.39, 
         "sourceUrl": "http://fullbellysisters.blogspot.com/2012/01/cauliflower-fried-rice-more-veggies.html"}
         ]



    @patch('ext_api.find_recipe_api2')
    def test_search_recipe2(self, mock_find_recipe):
        mock_find_recipe.return_value = json.dumps(self.recipe_data)
        self.assertEqual(search_recipe2(), mock_find_recipe.return_value)
        # print("Test 3 completed")

    
    # mock the requests library
    @patch('ext_api.requests')
    def test_find_recipe_api2_ok(self, mock_requests):
        # mock the response as an instance of the MagicMock class
        mock_response = MagicMock()
        # define the response status code and return values
        mock_response.status_code = 200
        mock_response.json.return_value = {"results": self.recipe_data}
        # mock the get method
        mock_requests.get.return_value = mock_response
        self.assertEqual(find_recipe_api2(), self.recipe_data)
        # print("Test 4 completed")


    @patch('ext_api.requests')
    def test_find_recipe_api2_empty(self, mock_requests):
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_response.json.return_value = {"results": []}
        mock_requests.get.return_value = mock_response
        expected = "Sorry, we did not find any recipe within that budget"
        self.assertEqual(find_recipe_api2(), expected)
        # print("Test 5 completed")

    @patch('ext_api.requests')
    def test_find_recipe_api2_error(self, mock_requests):
        mock_response = MagicMock()
        mock_response.status_code != 200
        mock_requests.get.return_value = mock_response
        expected = {"Error. Status code: ": mock_response.status_code}
        self.assertEqual(find_recipe_api2(), expected)
        # print("Test 6 completed")

    

if __name__ == "__main__":
    unittest.main()