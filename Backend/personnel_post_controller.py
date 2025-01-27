from flask import request, jsonify
from flask_mysqldb import MySQL
from datetime import datetime

class PersonnelPostController:
    def __init__(self, mysql):
        self.mysql = mysql

    def add_personnel(self):
        """Add a new personnel record to the database"""
        try:
            data = request.json
            
            # Validate required fields
            required_fields = ['firstName', 'lastName', 'jobTitle', 'phone', 'age', 'gender', 'image']
            for field in required_fields:
                if field not in data:
                    return jsonify({"error": f"Missing required field: {field}"}), 400

            # Prepare data for insertion
            first_name = data['firstName']
            last_name = data['lastName']
            job_title = data['jobTitle']
            phone = data['phone']
            age = data['age']
            gender = data['gender']
            date_added = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            
            # Process image data
            image_data = data['image']
            if image_data.startswith('data:image'):
                image_data = image_data.split(',')[1]

            # Ensure proper base64 padding
            missing_padding = len(image_data) % 4
            if missing_padding:
                image_data += '=' * (4 - missing_padding)

            # Create cursor and execute insert
            cursor = self.mysql.connection.cursor()
            query = """
                INSERT INTO personnel (firstName, lastName, jobTitle, phone, age, gender, date_added, imageUrl)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """
            
            cursor.execute(query, (first_name, last_name, job_title, phone, age, gender, date_added, image_data))
            self.mysql.connection.commit()
            cursor.close()

            return jsonify({
                "message": "Personnel added successfully", 
                "personnel": f"{first_name} {last_name}"
            }), 201

        except Exception as e:
            self.mysql.connection.rollback()
            print(f"Error adding personnel: {e}")
            return jsonify({"error": "Failed to add personnel"}), 500