
from flask import jsonify

class PersonnelUpdateController:
    def __init__(self, mysql):
        self.mysql = mysql

    def update_personnel(self, id, data):
        try:
            cur = self.mysql.connection.cursor()
            cur.execute("SELECT * FROM personnel WHERE id = %s", (id,))
            person = cur.fetchone()

            if not person:
                return jsonify({'message': 'Personnel not found'}), 404

            first_name = data.get('firstName', person[1])  
            last_name = data.get('lastName', person[2])    
            job_title = data.get('jobTitle', person[3])    
            phone = data.get('phone', person[4])          
            age = data.get('age', person[5])              
            gender = data.get('gender', person[6])        
            image = data.get('image', person[7])  

            cur.execute("""
                UPDATE personnel 
                SET firstName = %s, lastName = %s, jobTitle = %s, phone = %s, age = %s, gender = %s, imageUrl = %s
                WHERE id = %s
            """, (first_name, last_name, job_title, phone, age, gender, image, id))
            self.mysql.connection.commit()
            cur.close()

            return jsonify({'message': 'Personnel updated successfully'}), 200
        except Exception as e:
            return jsonify({'message': 'Error updating personnel', 'error': str(e)}), 500
