import base64
import MySQLdb
from flask import jsonify
from flask_mysqldb import MySQL

class GetMenuItemsController:
    def __init__(self, mysql):
        self.mysql = mysql

    def get_all_menu_items(self):
        """Retrieve all menu items from the database"""
        try:
            # Create cursor to interact with the database
            cursor = self.mysql.connection.cursor(MySQLdb.cursors.DictCursor)  # Using DictCursor for dictionary output
            
            # Define query to fetch all menu items data
            query = "SELECT * FROM menu_items"
            cursor.execute(query)
            
            # Fetch all records
            menu_items = cursor.fetchall()
            cursor.close()

            # If there are no menu items, return an empty list
            if not menu_items:
                return jsonify([]), 200

            # Map the database fields to a JSON object
            menu_items_data = [
                {
                    'id': item['id'],  # Mapping to database column 'id'
                    'name': item['name'],  # Mapping to database column 'name'
                    'description': item['description'],  # Mapping to database column 'description'
                    'price': item['price'],  # Mapping to database column 'price'
                    'category': item['category'],  # Mapping to database column 'category'
                    'image': item['image'] if item['image'] else None  # Directly return the base64 string
                }
                for item in menu_items
            ]

            # Return the menu items data as a JSON response
            return jsonify(menu_items_data), 200

        except Exception as e:
            # Handle exceptions and return error response
            print(f"Error fetching menu items: {e}")
            return jsonify({'message': 'Error fetching menu items', 'error': str(e)}), 500
