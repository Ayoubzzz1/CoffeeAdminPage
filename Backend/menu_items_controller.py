from flask import request, jsonify
from flask_mysqldb import MySQL
import base64
from PIL import Image
import io
import re

class MenuItemsController:
    def __init__(self, mysql):
        self.mysql = mysql
        self.MAX_IMAGE_SIZE = 500 * 1024  # 500KB limit
        self.MAX_IMAGE_DIMENSIONS = (800, 800)  # Maximum width/height in pixels

    def compress_image(self, base64_string):
        """Compress image and ensure it meets size requirements"""
        try:
            # Remove data URL prefix if present
            if ',' in base64_string:
                base64_string = base64_string.split(',')[1]

            # Convert base64 to image
            image_data = base64.b64decode(base64_string)
            img = Image.open(io.BytesIO(image_data))

            # Convert RGBA to RGB if necessary
            if img.mode in ('RGBA', 'LA'):
                background = Image.new('RGB', img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[-1])
                img = background

            # Resize image if larger than maximum dimensions
            if img.size[0] > self.MAX_IMAGE_DIMENSIONS[0] or img.size[1] > self.MAX_IMAGE_DIMENSIONS[1]:
                img.thumbnail(self.MAX_IMAGE_DIMENSIONS, Image.Resampling.LANCZOS)

            # Save compressed image to bytes buffer
            buffer = io.BytesIO()
            img.save(buffer, format='JPEG', quality=85, optimize=True)
            compressed_image = buffer.getvalue()

            # Check if size is still too large
            if len(compressed_image) > self.MAX_IMAGE_SIZE:
                quality = 85
                while len(compressed_image) > self.MAX_IMAGE_SIZE and quality > 20:
                    buffer = io.BytesIO()
                    quality -= 10
                    img.save(buffer, format='JPEG', quality=quality, optimize=True)
                    compressed_image = buffer.getvalue()

            if len(compressed_image) > self.MAX_IMAGE_SIZE:
                raise ValueError("Image is too large even after compression")

            return base64.b64encode(compressed_image).decode('utf-8')

        except Exception as e:
            raise ValueError(f"Error processing image: {str(e)}")

    def validate_price(self, price):
        """Validate price format and range"""
        try:
            price_float = float(price)
            if price_float <= 0 or price_float > 10000:  # Adjust max price as needed
                raise ValueError
            return True
        except ValueError:
            return False

    def add_menu_item(self):
        """Add a new menu item to the database"""
        try:
            # Retrieve form data
            name = request.form.get('name', '').strip()
            description = request.form.get('description', '').strip()
            price = request.form.get('price', '').strip()
            category = request.form.get('category', '').strip()
            image_data = request.form.get('image')

            # Validate required fields
            if not all([name, description, price, category, image_data]):
                missing_fields = [field for field in ['name', 'description', 'price', 'category', 'image'] 
                                if not request.form.get(field)]
                return jsonify({
                    "error": f"Missing required fields: {', '.join(missing_fields)}"
                }), 400

            # Validate field lengths
            if len(name) > 100 or len(description) > 500 or len(category) > 50:
                return jsonify({
                    "error": "Field length exceeds maximum limit"
                }), 400

            # Validate price
            if not self.validate_price(price):
                return jsonify({
                    "error": "Invalid price format or value"
                }), 400

            # Process and compress image
            try:
                compressed_image = self.compress_image(image_data)
            except ValueError as e:
                return jsonify({
                    "error": str(e)
                }), 400

            # Create cursor and execute insert
            cursor = self.mysql.connection.cursor()
            query = """
                INSERT INTO menu_items (name, description, price, category, image)
                VALUES (%s, %s, %s, %s, %s)
            """
            
            cursor.execute(query, (
                name,
                description,
                float(price),
                category,
                compressed_image
            ))
            self.mysql.connection.commit()
            cursor.close()

            return jsonify({
                "message": "Menu item added successfully",
                "menu_item": {
                    "name": name,
                    "category": category,
                    "price": price
                }
            }), 201

        except Exception as e:
            self.mysql.connection.rollback()
            print(f"Error adding menu item: {e}")
            return jsonify({
                "error": "Failed to add menu item",
                "details": str(e)
            }), 500