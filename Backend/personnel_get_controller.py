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
            SELECT id, firstName, lastName, jobTitle, imageUrl, phone, age, gender 
            FROM personnel
            """
            
            cursor.execute(query)
            personnel_data = cursor.fetchall()
            
            personnel_list = []
            for person in personnel_data:
                image_data = person[4]  # imageUrl (index is now 4 because we added the 'id' field)
                
                # Process image data if exists
                if image_data:
                    if image_data.startswith('data:image'):
                        image_data = image_data.split(',')[1]
                    
                    # Ensure proper base64 padding
                    missing_padding = len(image_data) % 4
                    if missing_padding:
                        image_data += '=' * (4 - missing_padding)
                
                personnel_list.append({
                    'id': person[0],  # id is now included in the returned data
                    'firstName': person[1],
                    'lastName': person[2],
                    'jobTitle': person[3],
                    'image': image_data,
                    'phone': person[5],
                    'age': person[6],
                    'gender': person[7]
                })

            cursor.close()
            return jsonify(personnel_list), 200

        except Exception as e:
            print(f"Error retrieving personnel: {e}")
            return jsonify({"error": "Failed to retrieve personnel"}), 500
