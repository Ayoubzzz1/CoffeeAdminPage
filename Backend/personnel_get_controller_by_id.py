
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

            personnel_data = {
                'id': person[0],
                'firstName': person[1],
                'lastName': person[2],
                'jobTitle': person[3],
                'phone': person[4],
                'age': person[5],
                'gender': person[6],
            }

            return jsonify(personnel_data), 200
        except Exception as e:
            return jsonify({'message': 'Error fetching personnel data', 'error': str(e)}), 500
