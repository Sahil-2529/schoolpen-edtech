from datetime import datetime

import flask_cors
from bson import ObjectId
from flask import Flask, request, jsonify, json
from flask_cors import CORS
from flask_pymongo import PyMongo
from gridfs import GridFS
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo.errors import DuplicateKeyError

import uuid  # Import the uuid module

import os

from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'pdfs'  # Folder to store uploaded PDFs
ALLOWED_EXTENSIONS =  {'png', 'jpg', 'jpeg', 'gif','jfif'}  # Allowed file extensions for PDFs



# Initialize app
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
flask_cors.cross_origin(
    origins='http://localhost:3000/',
    methods=['GET', 'POST', 'HEAD', 'OPTIONS', 'PUT','DELETE'],
    headers=None,
    supports_credentials=False,
    max_age=None,
    send_wildcard=True,
    always_send=True,
    automatic_options=False

)
CORS(app)  # Enable CORS for the entire app
app.config['MONGO_URI'] = 'mongodb://localhost:27017/mydatabase'
mongo = PyMongo(app)


# Generalized CRUD functions
def create_entity(collection_name, entity_data):
    try:
        result = mongo.db[collection_name].insert_one(entity_data)
        entity_data['_id'] = str(result.inserted_id)

        return jsonify(entity_data), 201
    except DuplicateKeyError:
        return jsonify({"error": f"{collection_name.capitalize()} with these attributes already exists"}), 400


def get_entities(collection_name):
    all_entities = list(mongo.db[collection_name].find())
    return jsonify(all_entities)


def get_entity(collection_name, entity_id):
    entity = mongo.db[collection_name].find_one({"_id": entity_id})
    return entity


def update_entity(collection_name, entity_id, entity_data):
    result = mongo.db[collection_name].update_one({"_id": entity_id},
                                                  {"$set": entity_data})
    if result.modified_count == 0:
        return jsonify({"error": f"{collection_name.capitalize()} notfound"}), 404
    updated_entity = mongo.db[collection_name].find_one({"_id": entity_id})
    return jsonify(updated_entity)


def delete_entity(collection_name, entity_id):
    deleted_entity = mongo.db[collection_name].find_one_and_delete({"_id": entity_id})
    if deleted_entity is None:
        return jsonify({"error": f"{collection_name.capitalize()} not found"}), 404
    return jsonify(deleted_entity)


def block_entity(collection_name, entity_id):
    entity = mongo.db[collection_name].find_one({"_id": entity_id})
    if not entity:
        return jsonify({"error": f"{collection_name.capitalize()} not found"}), 404

    new_blocked_value = not entity.get("blocked", False)  # Toggle the 'blocked' value
    result = mongo.db[collection_name].update_one({"_id": entity_id}, {"$set": {"blocked": new_blocked_value}})

    if result.modified_count == 0:
        return jsonify({"error": f"Failed to update {collection_name.capitalize()}'s 'blocked' status"}), 500

    updated_entity = mongo.db[collection_name].find_one({"_id": entity_id})

    return jsonify(updated_entity), 200


@app.errorhandler(500)
def handle_internal_error(error):
    return jsonify({"error": "Internal Server Error"}), 500


@app.route('/', methods=['GET'])
def home():
    return "Hello, World!"


# def create_board():
#     if 'name' not in request.json:
#         return jsonify({"error": "Missing name in request"}), 400
#
#     name = request.json['name']
#
#     board_data = {
#         "name": name
#     }
#
#     return create_entity('boards', board_data)
# User CRUD operations
@app.route('/login', methods=["POST"])
def login_user():
    if 'email' not in request.json or 'password' not in request.json or 'role' not in request.json:
        return jsonify({"message": "Missing email, password, or role in request"}), 400

    email = request.json['email']
    password = request.json['password']
    role = request.json['role']

    # Find the user by email
    user = mongo.db.users.find_one({"email": email,"role":role})
    print("-",user)
    if user and check_password_hash(user['password'], password):
        # User exists and credentials are valid
        # session['user_id'] = str(user['_id'])
        # session['role'] = role

        if role == 'admin':
            return jsonify({"message": "admin", "user": user})

        return jsonify({"message": "user", "user": user})
    else:
        # Invalid credentials or user not found
        return jsonify({"message": "Invalid credentials"}), 401

@app.route('/user', methods=['POST'])
def create_user():
    if 'name' not in request.json or 'password' not in request.json or  'email' not in request.json:
        return jsonify({"error": "Missing name or password in request"}), 400

    name = request.json['name']
    password = request.json['password']
    email=request.json['email']
    blocked=False

    if len(password) < 8:
        return jsonify({"error": "Password too short"}), 400

    hashed_password = generate_password_hash(password, method='sha256')

    user_data = {
        "_id": str(ObjectId()),
        "name": name,
        "password":hashed_password,
        "email":email,
        "role":"user",
        "blocked" : False
    }

    print(user_data)

    inserted_id = mongo.db.users.insert_one(user_data).inserted_id

    inserted_user = mongo.db.users.find_one({"_id": inserted_id})
    inserted_user["_id"] = str(inserted_user["_id"])
    print("Inserted user:", inserted_user)

    return jsonify(inserted_user)


@app.route('/user', methods=['GET'])
def get_users():
    entities=list(mongo.db.users.find())
    return jsonify(entities)



@app.route('/user/<string:user_id>', methods=['GET'])
def get_user(user_id):
    user_data = get_entity('users',user_id) # Replace this with your actual code to retrieve the user data
    if user_data is None:
        # If user data is not found, you can return an error response
        return jsonify({"error": "User not found"}), 404

    # If user data is found, return a JSON response with the user data
    return jsonify(user_data), 200


@app.route('/user/email/<string:email>', methods=['GET'])
def get_user_by_email(email):
    user = mongo.db.users.find_one({"email": email})
    if user is not None:
        return jsonify(user)
    else:
        return jsonify({"error": "User not found"}), 404


@app.route('/books/bookname/<string:book_id>',methods=['GET'])
def get_bookname_by_id(book_id):
    book_name=mongo.db.booknames.find({"_id":book_id})
    print("inside boookname by pubid",book_name.name)
    if book_name is not  None:
        return jsonify(list(book_name))
    else:
        return jsonify({"error": "User not found"}), 404





# @app.route('/user/id/<string:username>',methods=['GET'])
# def get_id(username):
#     user=mongo.db.users.find({'username':username},{'_id':1})
#     return get_entity('users', username)


@app.route('/user/<string:user_id>', methods=['PUT'])
def update_user(user_id):
    user_data = {}
    if 'name' in request.json:
        user_data['name'] = request.json['name']
    if 'password' in request.json:
        password = request.json['password']
    if 'email' in request.json:
        user_data['email']=request.json['email']
        if len(password) < 8:
            return jsonify({"error": "Password too short"}), 400
        hashed_password = generate_password_hash(password,
                                                 method='sha256')
        user_data['password'] = hashed_password


    return update_entity('users', user_id, user_data)


@app.route('/block/user/<string:user_id>', methods=['PUT'])
def block_user(user_id):
     return block_entity('users', user_id)


@app.route('/block/class/<string:id>', methods=['PUT'])
def block_class(id):
     return block_entity('school_classes', id)

@app.route('/user/<string:user_id>', methods=['DELETE'])
def delete_user(user_id):
    return delete_entity('users', user_id)


# Board CRUD operations
@app.route('/board', methods=['POST'])
def create_board():
    if 'name' not in request.json :
        return jsonify({"error": "Missing name in request"}), 400

    name = request.json['name']

    board_data = {
        "_id": str(ObjectId()),
        "name": name,
        "blocked": False
    }
    inserted_id = mongo.db.boards.insert_one(board_data).inserted_id

    inserted = mongo.db.boards.find_one({"_id": inserted_id})
    inserted["_id"] = str(inserted["_id"])

    print("Inserted user:", inserted)

    return jsonify(inserted)

@app.route('/lesson/resume', methods=['GET'])
def resume_lesson():
     user_id = request.args.get('user_id')
     lesson = mongo.db.lessons.find({'user_id': user_id,'started':'Yes','completed':'No','status':'resume'})
     if lesson is None:
         return jsonify({'message': 'No lessons found for this user or not started yet'}), 404
     return jsonify(dict(lesson)), 200

@app.route('/lesson/complete', methods=['GET'])
def comple_lesson():
     user_id = request.args.get('user_id')
     lesson = mongo.db.lessons.find({'user_id': user_id,'started':'Yes','completed':'Yes'})
     if lesson is None:
         return jsonify({'message': 'No lessons found for this user or not started yet'}), 404
     return jsonify(dict(lesson)), 200


@app.route('/lesson/start/<string:u_id>', methods=['GET'])
def start_lesson():
     u_id = request.args.get('user_id')
     lesson = mongo.db.lessons.find({'user_id':u_id,'started':'No','Completed':'No'},{'user_id':1})
     if not lesson['started'] :
         return jsonify({'message': 'Lessons already started'}), 400
     lesson['started'] = True
     mongo.db.lessons.update_one({'_id': u_id}, {'$set': {"started":"Yes"}})
     return jsonify(dict(lesson)), 200


@app.route('/board', methods=['GET'])
def get_boards():
    return get_entities('boards')


@app.route('/board/<string:board_id>', methods=['GET'])
def get_board(board_id):
    return get_entity('boards', board_id)


@app.route('/board/userid/<string:user_id>', methods=['GET'])
def get_board_by_uid(user_id):
    user = list(mongo.db.boards.find({"_id": user_id}))
    print(user)
    if user:
        return jsonify(user)
    else:
        return jsonify({"error": "User not found"}), 404


@app.route('/board/<string:board_id>', methods=['PUT'])
def update_board(board_id):
    board_data = {}
    if 'name' in request.json:
        board_data['name'] = request.json['name']

    return update_entity('boards', board_id, board_data)

@app.route('/block/board/<string:id>', methods=['PUT'])
def block_board(id):
     return block_entity('boards', id)

@app.route('/board/<string:board_id>', methods=['DELETE'])
def delete_board(board_id):
    return delete_entity('boards', board_id)


# SchoolClass CRUD operations
@app.route('/class', methods=['POST'])
def create_class():
    if 'name' not in request.json:
        return jsonify({"error": "Missing name in request"}), 400

    name = request.json['name']

    class_data = {
        "_id": str(ObjectId()),
        "name": name,
        "blocked": False
    }
    # inserted_id = mongo.db.school_classes.insert_one(class_data).inserted_id
    #
    # inserted = mongo.db.school_classes.find_one({"_id": inserted_id})
    # inserted["_id"] = str(inserted["_id"])
    #
    # print("Inserted user:", inserted)
    #
    # return jsonify(inserted)
    try:
        inserted_id = mongo.db.school_classes.insert_one(class_data).inserted_id
        inserted = mongo.db.school_classes.find_one({"_id": inserted_id})
        return jsonify({"_id": str(inserted["_id"]), "name": inserted["name"]})
    except Exception as e:
        return jsonify({"error": "Error occurred while creating the class"}), 500



@app.route('/class', methods=['GET'])
def get_classes():
    return get_entities('school_classes')


@app.route('/class/<string:class_id>', methods=['GET'])
def get_class(class_id):
    return get_entity('school_classes', class_id)

@app.route('/class/names/<string:name>',methods=['GET'])
def get_class_Data(name):
    try:
        book=mongo.db.school_classes.find_one({"name":name})
        if(book):
            return jsonify(book)
        else:
            return jsonify({"error": "No book found for the provided id"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route('/class/<string:class_id>', methods=['PUT'])
def update_class(class_id):
    class_data = {}
    if 'name' in request.json:
        class_data['name'] = request.json['name']

    return update_entity('school_classes', class_id, class_data)


@app.route('/class/<string:class_id>', methods=['DELETE'])
def delete_class(class_id):
    return delete_entity('school_classes', class_id)


# Publication CRUD operations
@app.route('/publication', methods=['POST'])
def create_publication():
    if 'name' not in request.json:
        return jsonify({"error": "Missing name in request"}), 400

    name = request.json['name']

    publication_data = {
        "_id":str(ObjectId()),
        "name": name,
        "blocked": False
    }
    try:

        inserted_id = mongo.db.publications.insert_one(publication_data).inserted_id
        inserted = mongo.db.publications.find_one({"_id": inserted_id})

        inserted["_id"] = str(inserted["_id"])
        return jsonify(inserted)
    except Exception as e:
        return jsonify({"error": "Error occurred while creating the publication"}), 500


@app.route('/publication', methods=['GET'])
def get_publications():
    return get_entities('publications')


@app.route('/publication/<string:publication_id>', methods=['GET'])
def get_publication(publication_id):
    return get_entity('publications', publication_id)

@app.route('/publication/name/<string:name>', methods=['GET'])
def get_publication_by_name(name):
    user = list(mongo.db.publications.find({"name": name}))
    # print(user)
    if user:
        return jsonify(user)
    else:
        return jsonify({"error": "User not found"}), 404


@app.route('/book/name/<string:name>', methods=['GET'])
def get_book_by_name(name):
    user = list(mongo.db.booknames.find({"name": name}))
    # print(user)
    if user:
        return jsonify(user)
    else:
        return jsonify({"error": "User not found"}), 404


@app.route('/publication/userid/<string:user_id>', methods=['GET'])
def get_publication_by_uid(user_id):
    user = list(mongo.db.publications.find({"u_id": user_id}))
    # print(user)
    if user:
        return jsonify(user)
    else:
        return jsonify({"error": "User not found"}), 404


@app.route('/publication/<string:publication_id>', methods=['PUT'])
def update_publication(publication_id):
    publication_data = {}
    if 'name' in request.json:
        publication_data['name'] = request.json['name']

    return update_entity('publications', publication_id,
                         publication_data)

@app.route('/block/publication/<string:id>', methods=['PUT'])
def block_publication(id):
     return block_entity('publications', id)

@app.route('/publication/<string:publication_id>', methods=['DELETE'])
def delete_publication(publication_id):
    return delete_entity('publications', publication_id)


# BookName CRUD operations
@app.route('/bookname', methods=['POST'])
def create_bookname():
    if 'name' not in request.json or 'stream_id' not in request.json or 'class_id' not in request.json or 'publication_id' not in request.json:
        return jsonify({"error": "Missing name, board_id, class_id, or publication_id in request"}), 400

    name = request.json['name']
    stream_id = request.json['stream_id']
    class_id = request.json['class_id']
    publication_id = request.json['publication_id']

    bookname_data = {
        "_id": str(ObjectId()),
        "name": name,
        "stream_id": stream_id,
        "class_id": class_id,
        "publication_id": publication_id,
        "blocked": False
    }

    # return create_entity('booknames', bookname_data)
    inserted_id = mongo.db.booknames.insert_one(bookname_data).inserted_id

    inserted = mongo.db.booknames.find_one({"_id": inserted_id})
    inserted["_id"] = str(inserted["_id"])

    # print("Inserted user:", inserted)

    return jsonify(inserted)


@app.route('/bookname', methods=['GET'])
def get_booknames():
    return get_entities('booknames')


@app.route('/bookname/<string:bookname_id>', methods=['GET'])
def get_bookname(bookname_id):
    return get_entity('booknames', bookname_id)


@app.route('/bookname/<string:bookname_id>', methods=['PUT'])
def update_bookname(bookname_id):
    bookname_data = {}
    if 'name' in request.json:
        bookname_data['name'] = request.json['name']
    if 'stream_id' in request.json:
        bookname_data['stream_id'] = request.json['stream_id']
    if 'class_id' in request.json:
        bookname_data['class_id'] = request.json['class_id']
    if 'publication_id' in request.json:
        bookname_data['publication_id'] = request.json['publication_id']

    return update_entity('booknames', bookname_id, bookname_data)


@app.route('/bookname/<string:bookname_id>', methods=['DELETE'])
def delete_bookname(bookname_id):
    return delete_entity('booknames', bookname_id)

@app.route('/block/bookname/<string:bookname_id>', methods=['PUT'])
def block_bookname(bookname_id):
     return block_entity('booknames', bookname_id)

def allowed_file(filename):
     return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Book CRUD operations
#
# @app.route('/book', methods=['POST'])
# def create_book():
#     if 'name' not in request.json or 'publisher' not in request.json or 'pdf' not in request.files:
#         return jsonify({"error": "Missing name, publisher, or pdf file in request"}), 400
#
#     name = request.json['name']
#     publisher = request.json['publisher']
#     pdf_file = request.files['pdf']  # Get the uploaded PDF file
#
#     if pdf_file.filename == '':
#         return jsonify({"error": "No selected file"}), 400
#
#     # Check if the uploaded file is a PDF
#     if pdf_file and allowed_file(pdf_file.filename):
#         # Generate a secure filename for the uploaded PDF
#         filename = secure_filename(pdf_file.filename)
#         pdf_path = os.path.join(UPLOAD_FOLDER, filename)
#
#         # Save the uploaded PDF to the server
#         pdf_file.save(pdf_path)
#
#         book_data = {
#             "_id": str(ObjectId()),
#             "name": name,
#             "publisher": publisher,
#             "pdf_path": pdf_path  # Save the path of the uploaded PDF in the database
#         }
#
#         try:
#             # Insert the book_data into the 'books' collection in MongoDB
#             inserted_id = mongo.db.books.insert_one(book_data).inserted_id
#             inserted = mongo.db.books.find_one({"_id": inserted_id})
#             return jsonify({"_id": str(inserted["_id"]), "name": inserted["name"]})
#         except Exception as e:
#             # Remove the uploaded PDF if an error occurred during insertion
#             os.remove(pdf_path)
#             return jsonify({"error": "Error occurred while creating the book"}), 500
#
#     else:
#         return jsonify({"error": "Invalid or missing PDF file"}), 400

fs = GridFS(mongo.db)
@app.route('/book', methods=['POST'])
def create_book():
    if 'name' not in request.json :
        return jsonify({"error": "Missing name or password in request"}), 400

    name = request.json['name']
    blocked=False


    data = {
        "_id": str(ObjectId()),
        "name": name,
        "blocked" : False
    }



    inserted_id = mongo.db.books.insert_one(data).inserted_id

    inserted = mongo.db.books.find_one({"_id": inserted_id})
    inserted["_id"] = str(inserted["_id"])
    print("Inserted user:", inserted)

    return jsonify(inserted)

@app.route('/book', methods=['GET'])
def get_books():
    return get_entities('books')


@app.route('/bookName', methods=['GET'])
def get_bookName():
    return get_entities('booknames')



@app.route('/book/<string:book_id>', methods=['GET'])
def get_book(book_id):
    book_data = get_entity('books', book_id)

    if book_data is not None:
        return jsonify(book_data)  # Return the book data as JSON
    else:
        return jsonify({"message": "Book not found"}), 404  # Return a 404 error with a message


@app.route('/book/<string:book_id>', methods=['PUT'])
def update_book(book_id):
    book_data = {}
    if 'name' in request.json:
        book_data['name'] = request.json['name']
    if 'publisher_name' in request.json:
        book_data['publisher_name']=request.json['publisher_name']

    return update_entity('books', book_id, book_data)


@app.route('/block/book/<string:id>', methods=['PUT'])
def block_book(id):
     return block_entity('books', id)

@app.route('/book/<string:book_id>', methods=['DELETE'])
def delete_book(book_id):
    return delete_entity('books', book_id)
    return jsonify(book)





# Lesson CRUD operations
@app.route('/lesson', methods=['POST'])
def create_lesson():
    lessons_collection = mongo.db.lessons
    user_id = request.json['user_id']
    book_id = request.json['book_id']
    # title=request.json['title']
    # objective=request.json['objective']
    # # content=request.json['content']
    # application=request.json['application']
    # relevance_to_subject=request.json['relevance_to_subject']
    # skill_gained=request.json['skill_gained']
    # events_problem=request.json['events_problem']
    # career_path=request.json['career_path']
    # last_interaction_with=request.json['last_interaction_with']
    # question=request.json['questions']
    # bookName = request.json.get('bookName', '')
    # informativeQues = request.json.get('informativeQues', '')
    # conceptualQues=request.json.get('conceptualQues', '')
    # colearningQues = request.json.get('colearningQues', '')
    status=request.json.get('status', '')
    answer = request.json.get('answer', '')
    days=request.json.get('days','')

    content_image_filenames = process_image_upload('content')
    informative_image_filenames = process_image_upload('informative')
    conceptual_image_filenames = process_image_upload('conceptual')
    colearning_image_filenames = process_image_upload('colearning')

    days_data = request.json.get('days', [])

    days = []
    for day_data in days_data:
        day_content = {
            'title': day_data.get('title', ''),
            'objective': day_data.get('objective', ''),
            'application': day_data.get('application', ''),
            'relevance_to_subject': day_data.get('relevance_to_subject',
                                                 ''),
            'skill_gained': day_data.get('skill_gained', ''),
            'events_problem': day_data.get('events_problem', ''),
            'career_path': day_data.get('career_path', ''),
            'last_interaction_with':
                day_data.get('last_interaction_with', ''),
            'question': day_data.get('questions', ''),
            'bookName': day_data.get('bookName', ''),
            'status': day_data.get('status', ''),
            'content': {
                'text': request.json['content'],
                'images': content_image_filenames,  # This is now a list offilenames
                'position_x': request.json.get('content_position_x', 0),
                'position_y': request.json.get('content_position_y', 0),
                'width': request.json.get('content_width', 0),
                'height': request.json.get('content_height', 0)
            },
            "colearningQues": day_data.get('colearningQues',[]),
            "informativeQues": day_data.get('informativeQues',[]),
            'conceptualQues': day_data.get('conceptualQues',[]),

        }
        days.append(day_content)

    new_lesson = {
        "_id":str(ObjectId()),  # Generate a new string-based ID using UUID
        # 'title':title,
        # 'objective':objective,
        # 'content': {
        #     'text': request.json['content'],
        #     'images': content_image_filenames,  # This is now a list offilenames
        #     'position_x': request.json.get('content_position_x', 0),
        #     'position_y': request.json.get('content_position_y', 0),
        #     'width': request.json.get('content_width', 0),
        #     'height': request.json.get('content_height', 0)
        # },
        # 'application':application,
        # 'skill_gained':skill_gained,
        # 'relevance_to_subject':relevance_to_subject,
        # 'events_problem':events_problem,
        # 'career_path':career_path,
        # 'last_interaction_with':last_interaction_with,
        # 'questions':question,
        'user_id': user_id,
        'book_id': book_id,
        'started':'Yes',
        'completed':'No',
        "blocked": False,
        # "bookName":bookName,
        # "colearningQues":colearningQues,
        # "informativeQues":informativeQues,
        # 'conceptualQues':conceptualQues,
        "status":status,
        "answer":answer,
        'days': days,

    }

    inserted_id = lessons_collection.insert_one(new_lesson).inserted_id
    created_lesson = lessons_collection.find_one({"_id": inserted_id})
    return jsonify(created_lesson), 201


@app.route('/lesson', methods=['GET'])
def get_lessons():
    lessons_collection = mongo.db.lessons
    all_lessons = lessons_collection.find()

    # Convert BSON documents to Python dictionary and convert ObjectId to string
    lessons_list = []
    for lesson in all_lessons:
        lesson['_id'] = str(lesson['_id'])
        lessons_list.append(lesson)

    # Return the lessons_list as a JSON response
    return jsonify(lessons_list)


@app.route('/lesson/<string:id>', methods=['GET'])
def get_lesson(id):
    lessons_collection = mongo.db.lessons
    lesson = lessons_collection.find_one({"_id": id})
    if lesson is None:
        return jsonify({"error": "Lesson not found"}), 404
    return jsonify(lesson)


@app.route('/lessons/forassign/<string:user_id>/<string:book_id>',methods=['GET'])
def get_lesson_by_uid_and_bid_assign(user_id,book_id):
    try:
        lesson=mongo.db.lessons.find_one({"user_id":user_id,"book_id":book_id,"completed":"No","status":"assigned"})
        if(lesson):
            return jsonify(lesson)
        else:
            return jsonify({"error": "No book found for the provided id"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/lessons/forresume/<string:user_id>/<string:book_id>',methods=['GET'])
def get_lesson_by_uid_and_bid_resume(user_id,book_id):
    try:
        lesson=mongo.db.lessons.find_one({"user_id":user_id,"book_id":book_id,"completed":"No","status":"resume"})
        if(lesson):
            return jsonify(lesson)
        else:
            return jsonify({"error": "No book found for the provided id"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route('/lessons/forcomplete/<string:user_id>/<string:book_id>',methods=['GET'])
def get_lesson_by_uid_and_bid_complete(user_id,book_id):
    try:
        lesson=mongo.db.lessons.find_one({"user_id":user_id,"book_id":book_id,"completed":"Yes","status":"completed"})
        if(lesson):
            return jsonify(lesson)
        else:
            return jsonify({"error": "No book found for the provided id"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500




@app.route('/lesson/<string:id>', methods=['PUT'])
def update_lesson(id):
    lessons_collection = mongo.db.lessons
    lesson = lessons_collection.find_one({"_id": id})

    if not lesson:
        return jsonify({"error": "Lesson not found"}), 404

    data = request.get_json()
    if not data:
        return jsonify({"error": "No JSON data in the request"}), 400
    # print(data['title'])

    if 'application' in data:
        lesson['application'] = data['application']
    if 'content' in data:
        lesson['content'] = data['content']
    if 'objective' in data:
        lesson['objective'] = data['objective']
    if 'relevance_to_subject' in data:
        lesson['relevance_to_subject'] = data['relevance_to_subject']
    if 'events_problem' in data:
        lesson['events_problem'] = data['events_problem']
    if 'career_path' in data:
        lesson['career_path'] = data['career_path']
    if 'questions' in data:
        lesson['questions'] = data['questions']
    if 'skill_gained' in data:
        lesson['skill_gained'] = data['skill_gained']
    if 'problem' in data:
        lesson['problem'] = data['problem']
    if 'title' in data:
        lesson['title']=data['title']
    if 'started' in data:
        lesson['started'] = data['started']
    if 'completed' in data:
        lesson['completed'] = data['completed']
    if 'status' in data:
        lesson['status']=data['status']
    if 'informativeQues' in data:
        lesson['informativeQues']=data['informativeQues']
    if 'colearningQues' in data:
        lesson['colearningQues']=data['colearningQues']
    if 'conceptualQues' in data:
        lesson['conceptualQues']=data['conceptualQues']
    if 'days' in data:
        lesson['days']=data['days']




    lessons_collection.update_one({"_id": id}, {"$set": lesson})
    updated_lesson = lessons_collection.find_one({"_id": lesson['_id']})

    return jsonify(updated_lesson)


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS





#@app.route('/lesson/image/<lesson_id>', methods=['PUT'])
#def upload_image_for_lesson(lesson_id):
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    image_file = request.files['file']
    if image_file and allowed_file(image_file.filename):

        filename =secure_filename(f"{str(ObjectId())}_{image_file.filename}")
        image_filepath = os.path.join(app.config['UPLOAD_FOLDER'],filename)
        image_file.save(image_filepath)

        return jsonify({'url': image_filepath}), 201

    #return jsonify({'error': 'Invalid file'}), 400


def process_image_upload(key_prefix):
    image_filenames = []
    index = 1
    while f'{key_prefix}image{index}' in request.files:
        image_file = request.files[f'{key_prefix}image{index}']
        if image_file and allowed_file(image_file.filename):
            timestamp = datetime.datetime.now().strftime('%Y%m%d%H%M%S')
            filename = secure_filename(f"{timestamp}{str(ObjectId())}{image_file.filename}")
            image_filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            image_file.save(image_filepath)
            image_filenames.append(image_filepath)
        index += 1
    return image_filenames
#
# @app.route('/lesson/image/<string:id>', methods=['PUT'])
# def update_image(id):
#     lessons_collection = mongo.db.lessons
#     lesson = lessons_collection.find_one({"_id": id})
#
#     if not lesson:
#         return jsonify({"error": "Lesson not found"}), 404
#
#     data = request.form
#     print(data)
#     if not data:
#         return jsonify({"error": "No data in the request"}), 400
#
#     day_index = data.get('day_index')  # Assuming you send the day index in the request
#     incremented_day_index = int(day_index) + 1
#     if 'file' in request.files:
#         uploaded_file = request.files['file']
#         if uploaded_file.filename != '':
#             uploaded_file.save('pdfs/' + uploaded_file.filename)
#             day_key = f"day{incremented_day_index}".strip()
#             print("-",day_key.lstrip())
#             if day_key in lesson['days']:
#                 lesson[day_index][day_key]['content']['image_url'] = 'YOUR_IMAGE_BASE_URL/' + uploaded_file.filename
#
#     # Update the text content for the specific day
#
#     day_key = f"day{incremented_day_index}"
#     if day_index in lesson['days']:
#         lesson[day_index][day_key]['content']['text'] = data.get('text', '')
#
#     lessons_collection.update_one({"_id": id}, {"$set": lesson})
#     updated_lesson = lessons_collection.find_one({"_id": lesson['_id']})
#
#     return jsonify(updated_lesson)
#

@app.route('/lesson/<string:id>', methods=['DELETE'])
def delete_lesson(id):
    lessons_collection = mongo.db.lessons
    lesson = lessons_collection.find_one({"_id": id})
    if lesson is None:
        return jsonify({"error": "Lesson not found"}), 404

    lessons_collection.delete_one({"_id": lesson['_id']})
    return jsonify(lesson)

@app.route('/lessons/assign/<string:user_id>', methods=['GET'])
def get_lessons_by_user_id(user_id):
    try:
        lessons = mongo.db.lessons.find({"user_id": user_id, "status": "assigned"})
        lesson_list = list(lessons)
        if lesson_list:
            return jsonify(lesson_list)
        else:
            return jsonify({"error": "No lessons found for the provided user_id"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/books/findid/<string:bookname>',methods=['GET'])
def get_book_id(bookname):
    try:
        book=mongo.db.books.find_one({"name":bookname},{"id":1})
        if(book):
            return jsonify(book)
        else:
            return jsonify({"error": "No book found for the provided id"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/lessons/findlesson/<string:user_id>/<string:book_id>',methods=['GET'])
def get_lesson_by_uid_and_bid(user_id,book_id):
    try:
        lesson=mongo.db.lessons.find_one({"user_id":user_id,"book_id":book_id,"started":"Yes","completed":"No"})
        if(lesson):
            return jsonify(lesson)
        else:
            return jsonify({"error": "No book found for the provided id"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/lessons/complete/<string:user_id>', methods=['GET'])
def get_complete_lessons_by_user_id(user_id):
    try:
        lessons = mongo.db.lessons.find({"user_id": user_id, "started": "Yes","completed":"Yes"})
        lesson_list = list(lessons)

        if lesson_list:
            return jsonify(lesson_list)
        else:
            return jsonify({"error": "No lessons found for the provided user_id"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/lessons/resume/<string:user_id>', methods=['GET'])
def get_resume_lessons_by_user_id(user_id):
    try:
        lessons = mongo.db.lessons.find({"user_id": user_id, "started": "Yes","completed":"No","status":"resume"})
        lesson_list = list(lessons)

        if lesson_list:
            return jsonify(lesson_list)
        else:
            return jsonify({"error": "No lessons found for the provided user_id"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/lessons/resume/<string:user_id>', methods=['GET'])
def get_lessons_by_user_id_resume(user_id):
    try:
        lessons = mongo.db.lessons.find({"user_id": user_id, "started": "Yes","completed":"No"})
        lesson_list = list(lessons)

        if lesson_list:
            return jsonify(lesson_list)
        else:
            return jsonify({"error": "No lessons found for the provided user_id"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/lesson/completed', methods=['GET'])
def get_completed_lessons():
    lessons_collection = mongo.db.lessons
    completed_lessons = lessons_collection.find({"status": "completed"})
    return jsonify(list(completed_lessons))


@app.route('/lesson/incomplete', methods=['GET'])
def get_incomplete_lessons():
    lessons_collection = mongo.db.lessons
    incomplete_lessons = lessons_collection.find({"status": "incomplete"})
    return jsonify(list(incomplete_lessons))


@app.route('/lesson/complete/<string:id>', methods=['PUT'])
def complete_lesson(id):
    lessons_collection = mongo.db.lessons
    lesson = lessons_collection.find_one({"_id": id})
    if lesson is None:
        return jsonify({"error": "Lesson not found"}), 404

    lesson['status'] = 'completed'
    lessons_collection.update_one({"_id": lesson['_id']}, {"$set":
                                                               lesson})
    return jsonify(lesson)


@app.route('/stream/<string:id>', methods=['GET'])
def get_stream(id):
    stream_data = get_entity('streams', id)

    if stream_data:
        return jsonify(stream_data)
    else:
        return jsonify({"error": "Stream not found"}), 404



@app.route('/board', methods=['OPTIONS'])
def handle_options_request():
    # Add CORS headers to allow the pre-flight request
    response_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    }
    return ('', 200, response_headers)

@app.route('/assignedplan/<string:user_id>', methods=['GET'])
def get_assigned_plan(user_id):
    user_lessons = mongo.db.lessons.find({"user_id":user_id,"started":"No"})
    print(user_lessons)
    if(user_lessons is None):
        return jsonify({"error": "Stream not found"}), 404
    return jsonify(list(user_lessons))

if __name__ == '_main_':
    app.run(debug=True)