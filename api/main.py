
from flask import Flask, request, session, redirect, url_for
from flask_cors import CORS
from sql_cnx import *
from werkzeug.security import generate_password_hash, check_password_hash
from ext_api import find_recipe_api, get_recipe_info_api
from datetime import timedelta


app = Flask(__name__)
app.secret_key = 'SUPER_SECRET_SESSION_KEY'
app.permanent_session_lifetime = timedelta(hours=3)
CORS(app, origins=['http://localhost:*'], supports_credentials=True)

create_db(DB_NAME=DB_NAME)

use_db()

create_table_users()

create_table_saved_recipe()


# app route to the home page
@app.route('/')
def status_page():
    return 'Login / registration API is running!'


# app route to register
@app.route('/register', methods=['POST'])
def register_user():
    user_input = request.json
    email = user_input['email']
    password = user_input['password']
    password = generate_password_hash(password, method='sha256')
    name = user_input['name']
    print(f"User entered e-mail: {email} + password {password} + name {name}")
    register_status = register_user_db(email, password, name)
    if register_status["success"]:
        session['email'] = email
        session['name'] = name

    return register_status


# get info about logged in user
@app.route('/user/me')
def get_logged_in_user_info():
    if session.get('email'):
        return {
            'isLoggedIn': True,
            'name': session.get('name')
        }
    else:
        return {
            'isLoggedIn': False
        }


# app route to log in
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user_input = request.json
        email = user_input['email']
        password = user_input['password']
        user_data_db = get_login_user_db(email)
        if user_data_db:
            user_name = user_data_db[0]
            password_db = user_data_db[1]
            if check_password_hash(password_db, password):
                session['email'] = email
                session['name'] = user_name
                session.permanent = True
                return {
                    'loggedIn': True,
                    'email': session['email'],
                    'name': user_name
                }
                # redirect(url_for('dashboard'))
            else:
                return {
                    'loggedIn': False,
                    'message': 'Invalid password'
                }
        else:
            return {
                'loggedIn': False,
                'message': 'Username does not exist. Do you need to register?'
            }

            # still need to work on the 'else' part. GET request to login page?
    else:
        if 'email' in session:
            pass
            # redirect(url_for('dashboard'))
        else:
            pass
            # redirect(url_for('login'))


# app route to user dashboard
@app.route('/user/dashboard')
def dashboard():
    if 'email' in session:
        return "Welcome to your dashboard"
    else:
        return "You need to login"      # use alert?
        # redirect(url_for('login'))


# app route to search recipe
@app.route('/search_recipe')
def search_recipe():
    cuisine = request.args.get('cuisine', None)
    diet = request.args.get('diet', None)
    intolerances = request.args.get('intolerances', None)
    type = request.args.get('meal_type', None)
    budget = request.args.get('budget', None)
    persons = request.args.get('persons', '1')
    result = find_recipe_api(cuisine=cuisine, diet=diet, intolerances=intolerances,
                             type=type, budget=budget, persons=persons)
    return result


# app route to get further details - ingredients and instructions about a recipe (only for logged in users)
@app.route('/user/<recipe_id>')
def get_recipe_details(recipe_id):
    if 'email' in session:
        email = session['email']
        result = get_recipe_info_api(recipe_id)
        return result
    else:
        return {"message": "You need to login"}     
        # redirect(url_for('login'))


# app route for saving recipe (only for logged in users)
@app.route('/user/save_recipe/<string:recipe_id>/<path:recipe_image>/<string:recipe_name>')
def save_recipe(recipe_id, recipe_image, recipe_name):
    if 'email' in session:
        email = session['email']
        result = save_recipes_db(email, recipe_id, recipe_image, recipe_name)
        return result
    else:
        return {"message": "You need to login"}       
        # redirect(url_for('login'))


# app route for viewing saved recipes (only for logged in users)
@app.route('/user/saved_recipes')
def saved_recipes():
    if 'email' in session:
        email = session['email']
        result = saved_recipes_db(email)
        return result
    else:
        return {"message": "You need to login"}       
        # redirect(url_for('login'))


# app route for deleting recipe (only for logged in users)
@app.route('/user/delete_recipe/<string:recipe_id>/<path:recipe_image>/<string:recipe_name>')
def delete_recipe(recipe_id, recipe_image, recipe_name):
    if 'email' in session:
        email = session['email']
        result = delete_recipes_db(email, recipe_id, recipe_image, recipe_name)
        return result
    else:
        return {"message": "You need to login"}      
        # redirect(url_for('login'))


# app route to sign out (only for logged in users)
@app.route('/user/signout')
def sign_out():
    if 'email' in session:
        session.pop('email', None)
        return {'success': True}
        # redirect(url_for('login'))
    else:
        return {"message": "You need to login"} 
        # redirect(url_for('login'))


app.run(port=3300, debug=True)

close_db()
