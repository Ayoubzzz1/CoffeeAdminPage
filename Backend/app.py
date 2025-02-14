import base64
from datetime import datetime
import MySQLdb
from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS
import json
import os
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import text
app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 10 MB
CORS(app, origins="http://localhost:5176", methods=["GET", "POST", "DELETE", "PUT", "OPTIONS"])
CATEGORIES_FILE = os.path.join(os.getcwd(), 'categories.json')
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
from personnel_get_controller_by_id import PersonnelGetControllerById
from personnel_update_controller import PersonnelUpdateController
from menu_items_controller import MenuItemsController
from get_all_menu_items import GetMenuItemsController
# Initialize controllers
get_controller = PersonnelGetController(mysql)
post_controller = PersonnelPostController(mysql)
delete_controller = PersonnelDeleteController(mysql)  # New controller initialization
get_controller_by_id = PersonnelGetControllerById(mysql)
update_controller = PersonnelUpdateController(mysql)
menu_items_controller = MenuItemsController(mysql)
get_menu_items_controller = GetMenuItemsController(mysql)
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



@app.route('/api/personnel/<int:id>', methods=['GET'])
def get_personnel_by_id(id):
    return get_controller_by_id.get_personnel_by_id(id)

@app.route('/api/personnel/<int:id>', methods=['PUT'])
def update_personnel(id):
    data = request.get_json()
    return update_controller.update_personnel(id, data)

@app.route('/api/menuitems', methods=['POST'])
def add_menu_item():
    return menu_items_controller.add_menu_item()

@app.route('/api/menuitems', methods=['GET'])
def get_all_menu_items():
    return get_menu_items_controller.get_all_menu_items() 

  

@app.route('/api/categories', methods=['GET'])
def get_categories():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT name FROM categories")
        categories = [row[0] for row in cursor.fetchall()]
        cursor.close()
        return jsonify(categories)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@app.route('/api/categories', methods=['POST'])
def add_category():
    data = request.json
    new_category = data.get('category')

    if not new_category:
        return jsonify({'error': 'Category is required'}), 400

    try:
        cursor = mysql.connection.cursor()
        cursor.execute("INSERT IGNORE INTO categories (name) VALUES (%s)", (new_category,))
        mysql.connection.commit()
        cursor.close()

        # Return the updated list of categories
        return get_categories()
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/saveTablePositions', methods=['POST'])
def save_table_positions():
    data = request.json
    tables = data.get('tables')

    cursor = mysql.connection.cursor()

    for table in tables:
        cursor.execute("""
            INSERT INTO table_positions (table_id, seats, x_position, y_position)
            VALUES (%s, %s, %s, %s)
        """, (table['id'], table['seats'], table['x_position'], table['y_position']))
    
    mysql.connection.commit()
    cursor.close()

    return jsonify({'message': 'Table positions saved successfully'}), 200

    
    conn.commit()
    cursor.close()
    conn.close()

    return jsonify({'message': 'Table positions saved successfully'}), 200


@app.route('/api/tablePositions', methods=['GET'])
def get_table_positions():
    try:
        # Retrieve table positions from the database
        table_positions = TablePosition.query.all() # type: ignore
        
        # Prepare a list of positions to return
        positions = []
        for position in table_positions:
            positions.append({
                'id': position.id,
                'table_id': position.table_id,
                'seats': position.seats,
                'x_position': position.x_position,
                'y_position': position.y_position,
            })
        
        return jsonify(positions)
    except Exception as e:
        return jsonify({'error': str(e)}), 500




@app.route('/attendance', methods=['POST'])
def save_attendance():
    try:
        # Parse incoming JSON data
        data = request.json
        print("Received data:", data)

        # Validate required fields
        required_fields = ['personnel_name', 'attendance_date', 'status']
        for field in required_fields:
            if field not in data or data[field] == '':
                return jsonify({'error': f'{field} is required'}), 400

        # Extract and parse data
        personnel_name = data['personnel_name']
        
        # Parse date
        try:
            attendance_date = datetime.strptime(data['attendance_date'], '%Y-%m-%d')
        except ValueError as e:
            return jsonify({'error': f'Invalid date format: {str(e)}'}), 400

        status = data['status']
        
       

        # Create cursor
        cursor = mysql.connection.cursor()
        
        # Find personnel ID
        cursor.execute("""
            SELECT id 
            FROM personnel 
            WHERE CONCAT(firstName, ' ', lastName) = %s
        """, (personnel_name,))
        
        result = cursor.fetchone()
        
        if not result:
            cursor.close()
            return jsonify({'error': f'Personnel not found: {personnel_name}'}), 404

        personnel_id = result[0]

        # Insert attendance record
        cursor.execute("""
            INSERT INTO attendance 
            (personnel_id, attendance_date, status) 
            VALUES (%s, %s, %s)
        """, (
            personnel_id,
            attendance_date,
            status
           
        ))

        # Commit the transaction
        mysql.connection.commit()
        
        # Get the ID of the inserted record
        attendance_id = cursor.lastrowid
        
        # Close the cursor
        cursor.close()

        return jsonify({
            'message': 'Attendance record saved successfully',
            'attendance_id': attendance_id
        }), 201

    except MySQLdb.Error as e:
        print(f"Database error: {str(e)}")
        return jsonify({'error': 'Database error occurred'}), 500
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return jsonify({'error': str(e)}), 500
    

@app.route('/api/personnel/<int:id>', methods=['GET'])
def get_personnel(id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT id, first_name, last_name, job_title, phone, age, gender, salary_per_day, total_salary, image FROM personnel WHERE id = %s", (id,))
    person = cur.fetchone()
    cur.close()

    if person:
        person_dict = {
            "id": person[0],
            "firstName": person[1],
            "lastName": person[2],
            "jobTitle": person[3],
            "phone": person[4],
            "age": person[5],
            "gender": person[6],
            "salary_per_day": person[7],
            "total_salary": person[8],
            "image": person[9].decode('utf-8') if person[9] else None
        }
        return jsonify(person_dict), 200
    return jsonify({"error": "Person not found"}), 404

@app.route('/api/attendance/<int:id>', methods=['GET'])
def get_attendance(id):
    cur = mysql.connection.cursor()
    cur.execute("SELECT attendance_date, status FROM attendance WHERE personnel_id = %s", (id,))
    attendance_records = cur.fetchall()
    cur.close()

    attendance_list = [
        {"attendance_date": record[0].strftime('%Y-%m-%d'), "status": record[1]}
        for record in attendance_records
    ]
    
    return jsonify(attendance_list), 200








if __name__ == '__main__':
    app.run(debug=True)
