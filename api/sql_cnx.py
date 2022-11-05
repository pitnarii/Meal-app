import mysql.connector
import os
import json


MYSQL_USER = "INSERT USER"
MYSQL_PASSWORD = "INSERT PASSWORD"



if not MYSQL_USER or not MYSQL_PASSWORD:
    raise Exception("Need to provide MYSQL_USER and MYSQL_PASSWORD environment variables")



DB_NAME = "frugal_chef"

cnx = mysql.connector.connect(
    user=MYSQL_USER,
    password=MYSQL_PASSWORD,
    host='127.0.0.1'
)
cursor = cnx.cursor()

def create_db(DB_NAME):
    try:
        cursor.execute(f"create database {DB_NAME}")
    except mysql.connector.Error as e:
        print(f"Failed to create database {DB_NAME} - assuming it already exists. Error was: {e}\n")
    return None

def use_db(DB_NAME=DB_NAME):
    cursor.execute(f"use {DB_NAME}")
    return None


def create_table_users():
    user_table_query = '''
        create table if not exists users (
            id serial primary key,
            name varchar(255) not null unique,
            email varchar(255) not null unique,
            password varchar(255)
        )
        '''
    cursor.execute(user_table_query)
    return None



def create_table_saved_recipe():
    saved_recipe_table_query = """
        CREATE TABLE IF NOT EXISTS saved_recipes (
        user_email VARCHAR(255) NOT NULL UNIQUE,
        recipe_ids JSON NOT NULL,
        recipe_image JSON NOT NULL,
        recipe_name JSON NOT NULL,
        FOREIGN KEY (user_email) REFERENCES users(email))
    """
    cursor.execute(saved_recipe_table_query)
    return None



def register_user_db(email, password, name):
    use_db()
    try:
        cursor.execute(
            'insert into users (email, password, name) values (%s, %s, %s)',
            (email, password, name)
        )
        cnx.commit()
        return {'success': True}
    except Exception as err:
        
        # return {'success': False, 
        # "Error message":f"User registration failed, error: {err}" }
        return {'success': False, 
        "Error message":"User registration failed" }



def get_login_user_db(email):
    use_db()
    cursor.execute('select name, password from users u where u.email = %s', (email,))
    result = cursor.fetchone()
    print(result)
    return result


def save_recipes_db(user_email, recipe_id, recipe_image, recipe_name):
    use_db()
    query = """
    INSERT INTO saved_recipes (user_email, recipe_ids, recipe_image, recipe_name) VALUES 
    ('{}','["{}"]', '"{}"', '"{}"')
    ON DUPLICATE KEY 
    UPDATE recipe_ids = JSON_ARRAY_APPEND(recipe_ids,'$', '"{}"'),
    recipe_image = JSON_ARRAY_APPEND(recipe_image,'$', '"{}"'),
    recipe_name = JSON_ARRAY_APPEND(recipe_name,'$', '"{}"')
    """.format(user_email, recipe_id, recipe_image, recipe_name, recipe_id, recipe_image, recipe_name)
    try:
        cursor.execute(query)
        cnx.commit()
        return {'success': True, "message": "Recipe added to saved recipes."}    
    except Exception as err:
        return {'success': False, 
         "message":f"Recipe not saved, error: {err}" }

def saved_recipes_db(user_email):
    use_db()
    query = """
    SELECT recipe_ids, recipe_image, recipe_name
    FROM saved_recipes 
    WHERE user_email = '{}'
    """.format(user_email)
    cursor.execute(query)
    result = cursor.fetchall()
    recipe_dict = {}
    recipe_dict["ids"] = json.loads(result[0][0])
    recipe_dict["images"] = json.loads(result[0][1])
    recipe_dict["name"] = json.loads(result[0][2])

    return recipe_dict


def delete_recipes_db(user_email, recipe_id, recipe_image, recipe_name):
    use_db()
    query = """
    UPDATE saved_recipes
    SET recipe_ids = JSON_REMOVE(
    recipe_ids, replace(JSON_SEARCH(recipe_ids, 'one', '{}'), '"', '')),
    recipe_image = JSON_REMOVE(
    recipe_image, replace(JSON_SEARCH(recipe_image, 'one', '{}'), '"', '')),
    recipe_name = JSON_REMOVE(
    recipe_name, replace(JSON_SEARCH(recipe_name, 'one', '{}'), '"', ''))
    WHERE user_email = '{}'
    AND JSON_SEARCH(recipe_ids, 'one', '{}') IS NOT NULL""".format(recipe_id, recipe_image, recipe_name, user_email, recipe_id)

    try:
        cursor.execute(query)
        cnx.commit()
        return {'success': True}    
    except Exception as err:
        return {'success': False, 
        "Error message":f"Recipe not deleted, error: {err}" }


def close_db():
    cnx.commit()
    cursor.close()
    cnx.close()
    return None
