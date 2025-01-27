import base64
import MySQLdb
from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS
import json
import os
app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 10 MB
CORS(app, origins="http://localhost:5173", methods=["GET", "POST", "DELETE", "PUT", "OPTIONS"])
CATEGORIES_FILE = os.path.join(os.getcwd(), 'categories.json')
# Database configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'shopcoffee'

# Initialize MySQL
mysql = MySQL(app)

# Import controllers
from personnel_get_controller import PersonnelGetController
from personnel_post_controller import PersonnelPostController
from personnel_delete_controller import PersonnelDeleteController  # New import
from personnel_get_controller_by_id import PersonnelGetControllerById
from personnel_update_controller import PersonnelUpdateController
from menu_items_controller import MenuItemsController
from get_all_menu_items import GetMenuItemsController
# Initialize controllers
get_controller = PersonnelGetController(mysql)
post_controller = PersonnelPostController(mysql)
delete_controller = PersonnelDeleteController(mysql)  # New controller initialization
get_controller_by_id = PersonnelGetControllerById(mysql)
update_controller = PersonnelUpdateController(mysql)
menu_items_controller = MenuItemsController(mysql)
get_menu_items_controller = GetMenuItemsController(mysql)
# Register routes
@app.route('/api/personnel', methods=['GET'])
def get_all_personnel():
    return get_controller.get_all_personnel()

@app.route('/api/personnel', methods=['POST'])
def add_personnel():
    return post_controller.add_personnel()

@app.route('/api/personnel/<int:id>', methods=['DELETE'])
def delete_personnel(id):
    return delete_controller.delete_personnel(id)  # Use the controller to handle deletion



@app.route('/api/personnel/<int:id>', methods=['GET'])
def get_personnel_by_id(id):
    return get_controller_by_id.get_personnel_by_id(id)

@app.route('/api/personnel/view/<int:id>', methods=['PUT'])
def update_personnel(id):
    data = request.get_json()
    return update_controller.update_personnel(id, data)

@app.route('/api/menuitems', methods=['POST'])
def add_menu_item():
    return menu_items_controller.add_menu_item()

@app.route('/api/menuitems', methods=['GET'])
def get_all_menu_items():
    return get_menu_items_controller.get_all_menu_items() 

  

@app.route('/api/categories', methods=['GET'])
def get_categories():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT name FROM categories")
        categories = [row[0] for row in cursor.fetchall()]
        cursor.close()
        return jsonify(categories)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@app.route('/api/categories', methods=['POST'])
def add_category():
    data = request.json
    new_category = data.get('category')

    if not new_category:
        return jsonify({'error': 'Category is required'}), 400

    try:
        cursor = mysql.connection.cursor()
        cursor.execute("INSERT IGNORE INTO categories (name) VALUES (%s)", (new_category,))
        mysql.connection.commit()
        cursor.close()

        # Return the updated list of categories
        return get_categories()
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
