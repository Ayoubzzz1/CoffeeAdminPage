from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="http://localhost:5173", methods=["GET", "POST", "DELETE", "PUT", "OPTIONS"])

# Database configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'shopcoffee'

# Initialize MySQL
mysql = MySQL(app)

# Import controllers
from personnel_get_controller import PersonnelGetController
from personnel_post_controller import PersonnelPostController
from personnel_delete_controller import PersonnelDeleteController  # New import
# Initialize controllers
get_controller = PersonnelGetController(mysql)
post_controller = PersonnelPostController(mysql)
delete_controller = PersonnelDeleteController(mysql)  # New controller initialization

# Register routes
@app.route('/api/personnel', methods=['GET'])
def get_all_personnel():
    return get_controller.get_all_personnel()

@app.route('/api/personnel', methods=['POST'])
def add_personnel():
    return post_controller.add_personnel()

@app.route('/api/personnel/<int:id>', methods=['DELETE'])
def delete_personnel(id):
    return delete_controller.delete_personnel(id)  # Use the controller to handle deletion

    # Fetch the personnel data from the database using the provided ID
    person = Personnel.query.get(id)
    if not person:
        return jsonify({'message': 'Personnel not found'}), 404

    # Get the data from the request
    data = request.get_json()

    # Update the personnel details
    person.first_name = data.get('firstName', person.first_name)
    person.last_name = data.get('lastName', person.last_name)
    person.job_title = data.get('jobTitle', person.job_title)
    person.phone = data.get('phone', person.phone)
    person.age = data.get('age', person.age)
    person.gender = data.get('gender', person.gender)

    # Handle image if present (assuming the image is base64 encoded)
    if 'image' in data:
        person.image = data['image'].encode('utf-8')

    try:
        # Commit the changes to the database
        db.session.commit()
        return jsonify({'message': 'Personnel updated successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Error updating personnel', 'error': str(e)}), 500
@app.route('/api/personnel/view/<int:id>', methods=['PUT'])
def update_personnel(id):
    try:
        # Fetch the personnel data from the database using the provided ID
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM personnel WHERE id = %s", (id,))
        person = cur.fetchone()
        
        if not person:
            return jsonify({'message': 'Personnel not found'}), 404

        # Get the data from the request
        data = request.get_json()
        first_name = data.get('firstName', person[1])  # Default to current value
        last_name = data.get('lastName', person[2])    # Default to current value
        job_title = data.get('jobTitle', person[3])    # Default to current value
        phone = data.get('phone', person[4])          # Default to current value
        age = data.get('age', person[5])              # Default to current value
        gender = data.get('gender', person[6])        # Default to current value

        # Handle image if present
        image = data.get('image', person[7])  # Default to current value

        # Update the personnel in the database
        cur.execute("""
            UPDATE personnel 
            SET firstName = %s, lastName = %s, jobTitle = %s, phone = %s, age = %s, gender = %s, imageUrl = %s
            WHERE id = %s
        """, (first_name, last_name, job_title, phone, age, gender, image, id))
        mysql.connection.commit()
        cur.close()

        return jsonify({'message': 'Personnel updated successfully'}), 200
    except Exception as e:
        return jsonify({'message': 'Error updating personnel', 'error': str(e)}), 500
@app.route('/api/personnel/<int:id>', methods=['GET'])
def get_personnel_by_id(id):
    try:
        # Query the database for the personnel with the given ID
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM personnel WHERE id = %s", (id,))
        person = cur.fetchone()
        cur.close()

        if not person:
            return jsonify({'message': 'Personnel not found'}), 404

        # Map the database fields to a JSON object
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


if __name__ == '__main__':
    app.run(debug=True)
