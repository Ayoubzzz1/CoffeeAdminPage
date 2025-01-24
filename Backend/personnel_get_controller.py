from flask import jsonify
from flask_mysqldb import MySQL

class PersonnelGetController:
    def __init__(self, mysql):
        self.mysql = mysql

    def get_all_personnel(self):
        """Retrieve all personnel records from the database"""
        try:
            cursor = self.mysql.connection.cursor()
            query = """
            SELECT firstName, lastName, jobTitle, imageUrl, phone, age, gender 
            FROM personnel
            """
            
            cursor.execute(query)
            personnel_data = cursor.fetchall()
            
            personnel_list = []
            for person in personnel_data:
                image_data = person[3]  # imageUrl
                
                # Process image data if exists
                if image_data:
                    if image_data.startswith('data:image'):
                        image_data = image_data.split(',')[1]
                    
                    # Ensure proper base64 padding
                    missing_padding = len(image_data) % 4
                    if missing_padding:
                        image_data += '=' * (4 - missing_padding)
                
                personnel_list.append({
                    'firstName': person[0],
                    'lastName': person[1],
                    'jobTitle': person[2],
                    'image': image_data,
                    'phone': person[4],
                    'age': person[5],
                    'gender': person[6]
                })

            cursor.close()
            return jsonify(personnel_list), 200

        except Exception as e:
            print(f"Error retrieving personnel: {e}")
            return jsonify({"error": "Failed to retrieve personnel"}), 500