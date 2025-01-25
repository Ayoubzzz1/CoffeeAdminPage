# personnel_delete_controller.py

from flask import jsonify

class PersonnelDeleteController:
    def __init__(self, mysql):
        self.mysql = mysql

    def delete_personnel(self, person_id):
        """Delete personnel record from the database"""
        try:
            cursor = self.mysql.connection.cursor()
            cursor.execute('DELETE FROM personnel WHERE id = %s', (person_id,))
            self.mysql.connection.commit()
            cursor.close()
            
            return jsonify({"message": "Personnel deleted successfully!"}), 200
        except Exception as e:
            print(f"Error deleting personnel: {e}")
            return jsonify({"error": "Failed to delete personnel"}), 500
