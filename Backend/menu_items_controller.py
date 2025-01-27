from flask import request, jsonify
from flask_mysqldb import MySQL
import base64

class MenuItemsController:
    def __init__(self, mysql):
        self.mysql = mysql

    def add_menu_item(self):
        """Add a new menu item to the database"""
        try:
            # Retrieve form data
            name = request.form.get('name')
            description = request.form.get('description')
            price = request.form.get('price')
            category = request.form.get('category')
            image_data = request.form.get('image')  # Base64 image data
            
            # Validate required fields
            required_fields = ['name', 'description', 'price', 'category', 'image']
            for field in required_fields:
                if not request.form.get(field):
                    return jsonify({"error": f"Missing required field: {field}"}), 400

            # Process image data
            if image_data.startswith('data:image'):
                image_data = image_data.split(',')[1]  # Remove base64 header if present

            # Ensure proper base64 padding
            missing_padding = len(image_data) % 4
            if missing_padding:
                image_data += '=' * (4 - missing_padding)

            # Create cursor and execute insert
            cursor = self.mysql.connection.cursor()
            query = """
                INSERT INTO menu_items (name, description, price, category, image)
                VALUES (%s, %s, %s, %s, %s)
            """
            
            cursor.execute(query, (name, description, price, category, image_data))
            self.mysql.connection.commit()
            cursor.close()

            return jsonify({
                "message": "Menu item added successfully", 
                "menu_item": name
            }), 201

        except Exception as e:
            self.mysql.connection.rollback()
            print(f"Error adding menu item: {e}")
            return jsonify({"error": "Failed to add menu item"}), 500
