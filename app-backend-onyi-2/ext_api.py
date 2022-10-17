import requests
import json
import os

API_KEY = os.environ.get("API_KEY")
SEARCH_RECIPE_URL = "https://api.spoonacular.com/recipes/complexSearch"
CONNECT_USER_URL = "https://api.spoonacular.com/users/connect"
MEAL_PLANNER_URL = "https://api.spoonacular.com/mealplanner/generate?apiKey=" 
NUMBER_OF_RETURNS = 50





def sort_recipe(recipe):
    return recipe["price"]

def get_recipe_array(result, budget):
    recipe_array = []
    for item in result:
        recipe_price = item["pricePerServing"]
        if recipe_price <= budget:
            recipe_title = item["title"]
            recipe_id = item["id"]
            recipe_image = item["image"]
            recipe_source_url = item["sourceUrl"]
            recipe_details = {
                "id": recipe_id,
                "name": recipe_title,
                "image": recipe_image,
                "price": recipe_price,
                "sourceUrl": recipe_source_url
            }
            recipe_array.append(recipe_details)
    recipe_array.sort(key=sort_recipe)
    return recipe_array



def find_recipe(**kwargs):
    """This function takes in optional user's preferences (intolerances can be a list of strings)
     and sends a get request to the spoonacular API. it returns a list of recipes based on the search criteria and
    sorted based on price (in cents) per serving."""
    choice = kwargs
    choice["number"] = NUMBER_OF_RETURNS
    choice["addRecipeInformation"] = "true"
    choice_str = ""
    for item in choice.items():
        if item[1] and item[0] != "budget":
            choice_str += f"&{item[0]}={item[1]}"

    params = f"apiKey={API_KEY}{choice_str}"
    query = f"{SEARCH_RECIPE_URL}?{params}"
    response = requests.get(query).json()
    # response = response.json()
    result = response["results"]
    budget = int(choice["budget"]) if choice.get("budget") else 9999999
    recipe_array = get_recipe_array(result, budget) 
    result = json.dumps(recipe_array)
    if result:
        return result
    else:
        return "Sorry, we did not find any recipe within that budget"
## result can further be sorted into basic info (id, name, image, price) and
## extra info like summary for manipulating front end
## the price is per person and in US cents. We can convert based on number of persons
## and convert to GBP

def connect_user(user_name, email):
    """This function connects the user to the spoonacular API 
    to enable them generate user-specific meal plans"""
    first_name = "First"
    last_name = "Last"
    payload = {
        "username": user_name,
        "firstName": first_name,
        "lastName": last_name,
        "email": email
    }

    header = {
        "x-api-key": API_KEY
    }
    response = requests.post(url=CONNECT_USER_URL, headers=header, data=json.dumps(payload))
    result = response.json()
    return result


def get_recipe_info(recipe_id):
    url_instructions = "https://api.spoonacular.com/recipes/{}/analyzedInstructions?apiKey={}&stepBreakdown=false".format(recipe_id, API_KEY)
    response = requests.get(url_instructions)
    response = response.json()
    instructions = []
    for item in response:
        steps = item["steps"]
        for step in steps:
            instruction = step['step']

            instructions.append(instruction)
    url_ingredient = "https://api.spoonacular.com/recipes/{}/ingredientWidget.json?apiKey={}".format(recipe_id, API_KEY)
    response = requests.get(url_ingredient)
    response = response.json()
    response_list = response["ingredients"]
    ingredient_list = []
    for item in response_list:
        item_name = item["name"]
        item_amount = item["amount"]["metric"]["value"]
        item_unit = item["amount"]["metric"]["unit"]
        ingredient = f"{item_name}, {item_amount} {item_unit}"
        ingredient_list.append(ingredient)
    recipe_info = {"ingredients": ingredient_list, "instructions": instruction}
    recipe_info = json.dumps(recipe_info)
    return recipe_info


def format_plan_day(response):
    meals = ["breakfast", "lunch", "dinner"]
    meals_dict = {}
    for i in range(len(meals)):
        title = response["meals"][i]["title"]
        recipe_id = response["meals"][i]["id"]
        url = response["meals"][i]["sourceUrl"]
        meal = [title, recipe_id, url]
        meals_dict[meals[i]] = meal
    meals_dict = json.dumps(meals_dict)
    return meals_dict


def format_plan_week(response):
    days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

    meal_dict = {}
    for day in days:
        meal_plan = []
        breakfast = {
            "title": response["week"][day]["meals"][0]["title"],
            "recipe_id": response["week"][day]["meals"][0]["id"],
            "url": response["week"][day]["meals"][0]["sourceUrl"]
        }
        meal_plan.append(breakfast)
        lunch = {
            "title": response["week"][day]["meals"][1]["title"],
            "recipe_id": response["week"][day]["meals"][1]["id"],
            "url": response["week"][day]["meals"][1]["sourceUrl"]
        }
        meal_plan.append(lunch)
        dinner = {
            "title": response["week"][day]["meals"][2]["title"],
            "recipe_id": response["week"][day]["meals"][2]["id"],
            "url": response["week"][day]["meals"][2]["sourceUrl"]
        }
        
        meal_plan.append(dinner)
        meal_dict[day] = meal_plan
    meal_dict = json.dumps(meal_dict)
    return meal_dict


def get_meal_plan(duration, **kwargs):
    """This function takes in duration ('day' or 'week') and 
    optional parameters with keys of 'diet' for dietary preferences, 'exclude' for allergies/intolerances
    and returns a meal plan for the specified duration based on search criteria"""
    if kwargs:
        params_dict = kwargs
    params_str = f"&timeFrame={duration}"
    for item in params_dict:
        params_str+=f"&{item[0]}={item[1]}"
    url = MEAL_PLANNER_URL+API_KEY+params_str
    response = requests.get(url)
    response = response.json()
    if duration == 'day':
        meal_dict = format_plan_day(response)
    elif duration == 'week':
        meal_dict = format_plan_week(response)
    return meal_dict


