from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# 连接 MySQL 数据库
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="123123",
    database="library_db"
)

@app.route('/add_book', methods=['POST'])
def add_book():
    data = request.json
    cursor = db.cursor()
    cursor.execute(
        "INSERT INTO books (title, author, category, available_copies, total_copies) VALUES (%s, %s, %s, %s, %s)",
        (data['title'], data['author'], data['category'], data['available_copies'], data['total_copies'])
    )
    db.commit()
    return jsonify({"message": "Book added successfully!"})

if __name__ == '__main__':
    app.run(debug=True)