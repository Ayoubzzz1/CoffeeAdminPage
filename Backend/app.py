
from flask import Flask
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins="http://localhost:5173")

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

# Initialize controllers
get_controller = PersonnelGetController(mysql)
post_controller = PersonnelPostController(mysql)

# Register routes
app.route('/api/personnel', methods=['GET'])(get_controller.get_all_personnel)
app.route('/api/personnel', methods=['POST'])(post_controller.add_personnel)

if __name__ == '__main__':
    app.run(debug=True)