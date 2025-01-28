import base64
from flask import jsonify

class PersonnelGetControllerById:
    def __init__(self, mysql):
        self.mysql = mysql

    def get_personnel_by_id(self, id):
        try:
            cur = self.mysql.connection.cursor()
            cur.execute("SELECT * FROM personnel WHERE id = %s", (id,))
            person = cur.fetchone()
            cur.close()

            if not person:
                return jsonify({'message': 'Personnel not found'}), 404

            # If the image is stored as binary data, we decode it to base64
            image = None
            if person[7]:  # Check if there is an image
                if isinstance(person[7], str):  # If it's already a string, it might be base64
                    image = person[7]  # Directly use the base64 string
                else:  # Otherwise, it's binary data, and we need to encode it
                    image = base64.b64encode(person[7]).decode('utf-8')

            # Construct the response with personnel data
            personnel_data = {
                'id': person[0],
                'firstName': person[1],
                'lastName': person[2],
                'jobTitle': person[3],
                'phone': person[4],
                'age': person[5],
                'gender': person[6],
                'imageUrl': image  # Now the image is a base64 string
            }

            return jsonify(personnel_data), 200
        except Exception as e:
            return jsonify({'message': 'Error fetching personnel data', 'error': str(e)}), 500
