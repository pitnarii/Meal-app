
from flask import Flask, request, session
from flask_cors import CORS
from sql_cnx import *
from werkzeug.security import generate_password_hash, check_password_hash
from ext_api import get_meal_plan, find_recipe, get_recipe_info



app = Flask(__name__)
app.secret_key = 'SUPER_SECRET_SESSION_KEY'
CORS(app, origins=['http://localhost:*'], supports_credentials=True)

create_db(DB_NAME=DB_NAME)

use_db(DB_NAME=DB_NAME)

create_table_users()

create_table_saved_recipe()


@app.route('/')
def status_page():
    return 'Login / registration API is running!'


@app.route('/register', methods=['POST'])
def register_user():
    
    user_input = request.json

    email = user_input['email']
    password = user_input['password']
    # hash the password
    password = generate_password_hash(password, method='sha256')

    name = user_input['name']
    print(f"User entered e-mail: {email} + password {password} + name {name}")
    register_status = register_user(email, password, name)
    if register_status["success"]:
        session['email'] = email

    return register_status


@app.route('/user/me')
def get_logged_in_user():
    email = session.get('email')

    if not email:
        return {
            'loggedIn': False
        }
    else:
        (user_name,) = get_login_user(email)

        return {
            'loggedIn': True,
            'email': session['email'],
            'name': user_name
        }
    # not sure how session verifies the user details. will look into it. 
    # here is the code to hash the login input to verify that it corresponds 
    # with hashed password in DB

    ## check_password_hash(PASSWORD IN DB, PASSWORD FROM LOGIN) 
    ## Returns a Boolean value


# app route to search recipe
@app.route('/user/search_recipe')
def search_recipe():
    cuisine = request.args.get('cuisine', None)
    diet = request.args.get('diet', None)
    intolerances = request.args.get('intolerances', None)
    type = request.args.get('meal_type', None)
    budget = request.args.get('budget', None)
    result = find_recipe(cuisine=cuisine, diet=diet, intolerances=intolerances, 
                            type=type, budget=budget)
    return result


# app route to get further details - ingredients and instructions about a recipe
@app.route('/user/<recipe_id>')
def get_recipe_details(recipe_id):
    result = get_recipe_info(recipe_id)
    return result
    


# app route for saving recipe
@app.route('/user/save_recipe/<recipe_id>')
def save_recipe(recipe_id):
    email = session['email']
    result = save_recipes(email, recipe_id)
    return result




#app route for getting meal plan
@app.route('/user/meal_plan/<duration>')
def meal_plan(duration):
    diet = request.args.get('diet', None)
    exclude = request.args.get('exclude', None)
    result = get_meal_plan(duration, diet=diet, exclude=exclude)
    return result


@app.route('/user/signout')
def sign_out():
    session.pop('email')
    return {'success': True}


app.run(port=3300, debug=True)

close_db()

