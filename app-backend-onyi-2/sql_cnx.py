import mysql.connector
import os


MYSQL_USER = os.environ.get('MYSQL_USER')
MYSQL_PASSWORD = os.environ.get('MYSQL_PASSWORD')



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


# I think the user name in the table users should be set to unique and not null as well??
# we need to modify the user's database to store their spoonacular password and hash, 
# this will be useful if they need to create a meal planner

def create_table_users():
    user_table_query = '''
        create table if not exists users (
            id serial primary key,
            name varchar(255) not null unique,
            email varchar(255) not null unique,
            password varchar(255),
            spoonacular_user_name varchar(255),
            spoonacular_password varchar(255),
            spoonacular_hash varchar(255)
        )
        '''
    cursor.execute(user_table_query)
    return None

# create table for saved recipes
# i used email as FK, because we can use session to get it

def create_table_saved_recipe():
    saved_recipe_table_query = """
        CREATE TABLE IF NOT EXISTS saved_recipes (
        user_email VARCHAR(255) NOT NULL UNIQUE,
        recipe_ids JSON NOT NULL,
        FOREIGN KEY (user_email) REFERENCES users(email))
    """
    cursor.execute(saved_recipe_table_query)
    return None



def register_user(email, password, name):
    use_db()
    try:
        cursor.execute(
            'insert into users (email, password, name) values (%s, %s, %s)',
            (email, password, name)
        )
        cnx.commit()
        return {'success': True}
    except Exception as err:
        
        return {'success': False, 
        "Error message":f"User registration failed, error: {err}" }



def get_login_user(email):
    use_db()
    cursor.execute('select name from users u where u.email = %s', (email,))
    result = cursor.fetchone()
    return result


def save_recipes(user_email, recipe_id):
    use_db()
    query = """
    INSERT INTO saved_recipes (user_email, recipe_ids) VALUES ({},'[{}]')
    ON DUPLICATE KEY 
    UPDATE recipe_ids = JSON_ARRAY_APPEND(recipe_ids,'$', '{}')
    """.format(user_email, recipe_id, recipe_id)
    try:
        cursor.execute(query)
        cnx.commit()
        return {'success': True}    
    except Exception as err:
        return {'success': False, 
        "Error message":"Recipe not saved, error: {err}" }


def add_spoonacular_data(username, password, hash, user_email):
    use_db()
    """This function takes the spoonacular specific data for the 
    user and updates the user database"""
    query = """
    UPDATE users 
    SET spoonacular_user_name = '{}',
         spoonacular_password = '{}',
         spoonacular_hash = '{}'
    WHERE email = '{}'
    """.format(username, password, hash, user_email)
    try:
        cursor.execute(query)
        cnx.commit()
        return {'success': True}    
    except Exception as err:
        return {'success': False, 
        "Error message":"Unable to save information to database, error: {err}" }

    
def get_spoonacular_data(user_email):
    use_db()
    """This function returns the spoonacular specific data for the user, if exists, 
    otherwise, returns None"""
    query = """
    SELECT spoonacular_user_name, spoonacular_password,
    spoonacular_hash
    FROM users 
    WHERE email = '{}'
    """.format(user_email)
    try:
        cursor.execute(query)
        result = cursor.fetchone()
        if result:
            data = {"sp_name": result[1], "sp_password": result[2], "sp_hash": result[3]}
            return {'success': True,
                'sp_data': data
             } 
        else:
            return {'success': True, 
                    'sp_data': None
                    }
    except Exception as err:
        return {'success': False, 
        "Error message":"Unable to save information to database, error: {err}" }
    




def close_db():
    cnx.commit()
    cursor.close()
    cnx.close()
    return None
