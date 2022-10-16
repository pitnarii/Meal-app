import mysql.connector
import os
from flask import Flask, request, session
from flask_cors import CORS

MYSQL_USER = os.environ.get('MYSQL_USER')
MYSQL_PASSWORD = os.environ.get('MYSQL_PASSWORD')

if not MYSQL_USER or not MYSQL_PASSWORD:
    raise Exception("Need to provide MYSQL_USER and MYSQL_PASSWORD environment variables")

app = Flask(__name__)
app.secret_key = 'SUPER_SECRET_SESSION_KEY'
CORS(app, origins=['http://localhost:*'], supports_credentials=True)

DB_NAME = "frugal_chef"

cnx = mysql.connector.connect(
    user=MYSQL_USER,
    password=MYSQL_PASSWORD,
    host='127.0.0.1'
)
cursor = cnx.cursor()

try:
    cursor.execute(f"create database {DB_NAME}")
except mysql.connector.Error as e:
    print(f"Failed to create database {DB_NAME} - assuming it already exists. Error was: {e}\n")

cursor.execute(f"use {DB_NAME}")
cursor.execute('''
       create table if not exists users (
         id serial primary key,
         name varchar(255),
         email varchar(255) not null unique,
         password varchar(255)
       )
    ''')


@app.route('/')
def status_page():
    return 'Login / registration API is running!'


@app.route('/register', methods=['POST'])
def register_user():
    try:
        user_input = request.json

        email = user_input['email']
        password = user_input['password']
        name = user_input['name']
        print(f"User entered e-mail: {email} + password {password} + name {name}")

        cursor.execute(
            'insert into users (email, password, name) values (%s, %s, %s)',
            (email, password, name)
        )
        cnx.commit()

        session['email'] = email

        return {'success': True}

    except Exception as err:
        print(f"User registration failed, error: {err}")
        return {'success': False}


@app.route('/user/me')
def get_logged_in_user():
    email = session.get('email')

    if not email:
        return {
            'loggedIn': False
        }
    else:
        cursor.execute('select name from users u where u.email = %s', (email,))
        (user_name,) = cursor.fetchone()

        return {
            'loggedIn': True,
            'email': session['email'],
            'name': user_name
        }


@app.route('/user/signout')
def sign_out():
    session.pop('email')
    return {'success': True}


app.run(port=3300, debug=True)

cnx.commit()
cursor.close()
cnx.close()
