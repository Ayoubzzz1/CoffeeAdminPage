from flask import Flask, jsonify, request
from flask_mysqldb import MySQL
from datetime import datetime
from flask_cors import CORS  # Importing CORS

app = Flask(__name__)

# Allow CORS only for the frontend's origin (http://localhost:5173)
CORS(app, origins="http://localhost:5173")

# Database configuration
app.config['MYSQL_HOST'] = 'localhost'  # XAMPP uses localhost
app.config['MYSQL_USER'] = 'root'       # Default XAMPP username
app.config['MYSQL_PASSWORD'] = ''       # Default XAMPP MySQL password is empty
app.config['MYSQL_DB'] = 'shopcoffee'   # Database name

# Initialize MySQL
mysql = MySQL(app)

@app.route('/')
def index():
    return "Welcome to the Shop Coffee API!"

@app.route('/api/personnel', methods=['POST'])
def add_personnel():
    data = request.json

    first_name = data['firstName']
    last_name = data['lastName']
    job_title = data['jobTitle']
    phone = data['phone']
    age = data['age']
    gender = data['gender']
    date_added = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    image_data = data['image']  # Base64 encoded image

    # SQL query to insert the personnel data into the database
    cursor = mysql.connection.cursor()
    query = """
        INSERT INTO personnel (firstName, lastName, jobTitle, phone, age, gender, dateAdded, imageUrl)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """
    try:
        cursor.execute(query, (first_name, last_name, job_title, phone, age, gender, date_added, image_data))
        mysql.connection.commit()
        cursor.close()

        return jsonify({"message": "Personnel added successfully", "personnel": f"{first_name} {last_name}"}), 201
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal server error"}), 500

@app.route('/api/personnel', methods=['GET'])
def get_personnel():
    # SQL query to fetch all personnel from the database
    cursor = mysql.connection.cursor()
    query = "SELECT firstName, lastName, jobTitle, imageUrl FROM personnel"
    
    try:
        cursor.execute(query)
        personnel_data = cursor.fetchall()  # Fetch all rows from the query
        
        # Process the data to return it in a more useful format
        personnel_list = []
        for person in personnel_data:
            # Assuming imageUrl contains base64 encoded image data
            image_data = person[3]  # The image URL or Base64 data is the fourth column
            
            # Verify and clean base64 data if needed
            if image_data:
                # Remove any data URI prefix if present
                if image_data.startswith('data:image'):
                    image_data = image_data.split(',')[1]
                
                # Ensure the base64 string is valid and has the correct padding
                missing_padding = len(image_data) % 4
                if missing_padding:
                    image_data += '=' * (4 - missing_padding)
                
                personnel_list.append({
                    'firstName': person[0],
                    'lastName': person[1],
                    'jobTitle': person[2],
                    'image': image_data  # Send base64 encoded image
                })
            else:
                personnel_list.append({
                    'firstName': person[0],
                    'lastName': person[1],
                    'jobTitle': person[2],
                    'image': None  # No image available
                })

        cursor.close()
        return jsonify(personnel_list), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(debug=True)
