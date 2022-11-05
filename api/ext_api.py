import requests
import json
import os





API_KEY = "INSERT OWN API KEY"
SEARCH_RECIPE_URL = "https://api.spoonacular.com/recipes/complexSearch"
NUMBER_OF_RETURNS = 50





def sort_recipe(recipe):
    return recipe["price"]

def get_recipe_array(result, budget, persons):
    recipe_array = []
    for item in result:
        recipe_price = (item["pricePerServing"] * persons)/100
        if recipe_price <= budget:
            recipe_title = item["title"]
            recipe_id = item["id"]
            recipe_image = item["image"]
            recipe_source_url = item["sourceUrl"]
            recipe_details = {
                "id": recipe_id,
                "name": recipe_title,
                "image": recipe_image,
                "price": "$" + '{0:.2f}'.format(recipe_price),
                "sourceUrl": recipe_source_url
            }
            recipe_array.append(recipe_details)
    recipe_array.sort(key=sort_recipe)
    return recipe_array



def find_recipe_api(**kwargs):
    """This function takes in optional user's preferences (intolerances can be a list of strings)
     and sends a get request to the spoonacular API. it returns a list of recipes based on the search criteria and
    sorted based on price (in cents) for number of servings entered"""
    choice = kwargs
    persons = int(choice.pop('persons'))
    choice["number"] = NUMBER_OF_RETURNS
    choice["addRecipeInformation"] = "true"
    choice_str = ""
    for item in choice.items():
        if item[1] and item[0] != "budget":
            choice_str += f"&{item[0]}={item[1]}"

    params = f"apiKey={API_KEY}{choice_str}"
    query = f"{SEARCH_RECIPE_URL}?{params}"
    response = requests.get(query)
    if response.status_code == 200:
        response = response.json()
        result = response["results"]
        budget = int(choice["budget"]) if choice.get("budget") else 9999999
        recipe_array = get_recipe_array(result, budget, persons) 
        result = json.dumps(recipe_array)
        if result:
            return result
        else:
            return "Sorry, we did not find any recipe within that budget"
    else:
        return {"Error. Status code: ": response.status_code}



def get_recipe_ingredients(recipe_id):
    ingredient_list = []
    url_ingredient = "https://api.spoonacular.com/recipes/{}/ingredientWidget.json?apiKey={}".format(recipe_id, API_KEY)
    response = requests.get(url_ingredient)
    if response.status_code == 200:
        response = response.json()
        response_list = response["ingredients"]
        
        for item in response_list:
            item_name = item["name"]
            item_amount = item["amount"]["metric"]["value"]
            item_unit = item["amount"]["metric"]["unit"]
            ingredient = f"{item_name}, {item_amount} {item_unit}"
            ingredient_list.append(ingredient)
        return ingredient_list
    else:
        print(f"Unable to get ingredients. Status code: {response.status_code}")
        return None

def get_recipe_instructions(recipe_id):
    instructions = []
    url_instructions = "https://api.spoonacular.com/recipes/{}/analyzedInstructions?apiKey={}&stepBreakdown=false".format(recipe_id, API_KEY)
    response = requests.get(url_instructions)
    if response.status_code == 200:
        response = response.json()
        for item in response:
            steps = item["steps"]
            for step in steps:
                instruction = step['step']
                instructions.append(instruction)
        return instructions
    else:
        print(f"Unable to get instructions. Status code: {response.status_code}")
        return None
        
        

def get_recipe_info_api(recipe_id):
    ingredients = get_recipe_ingredients(recipe_id)
    instructions = get_recipe_instructions(recipe_id)
    recipe_info = {"ingredients": ingredients, "instructions": instructions}
    recipe_info = json.dumps(recipe_info)
    return recipe_info
    
    



# ## TESTING

def search_recipe2():
    result = find_recipe_api2()
    return result


def find_recipe_api2():
    choice = {"persons": "1"}
    persons = int(choice.pop('persons'))
    choice["number"] = 2
    choice["addRecipeInformation"] = "true"
    choice_str = ""
    for item in choice.items():
        if item[1] and item[0] != "budget":
            choice_str += f"&{item[0]}={item[1]}"

    params = f"apiKey={API_KEY}{choice_str}"
    query = f"{SEARCH_RECIPE_URL}?{params}"
    response = requests.get(query)
    if response.status_code == 200:
        response = response.json()
        result = response["results"]
        # budget = int(choice["budget"]) if choice.get("budget") else 9999999
        # recipe_array = get_recipe_array(result, budget, persons) 
        # result = json.dumps(recipe_array)
        if result:
            return result
        else:
            return "Sorry, we did not find any recipe within that budget"
    else:
        return {"Error. Status code: ": response.status_code}



