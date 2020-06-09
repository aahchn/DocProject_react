from flask import Flask
from flask_restful import Api
from flask_cors import CORS
#from flask_jwt import JWT
from db import db

#from security import authenticate, identity
#from resources.user import UserRegister
from resources.item import Item, ItemList
from resources.category import category, categoryList

app = Flask(__name__)
CORS(app)  #allows other ports to connect to it
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'  #SQLAlchemy location
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False #turns off flask-SQLAlchemy tracker, SQLAlchemy tracker is still on
app.config['PROPAGATE_EXCEPTIONS'] = True
app.secret_key = 'jose'
api = Api(app)


#only creates table that it sees (import category, categoryList) -> talks to resource -> model (column def of db)
@app.before_first_request
def create_tables():
    db.create_all() #creates sqlite:///data.db before first request


#jwt = JWT(app, authenticate, identity)  # /auth

api.add_resource(category, '/category/<string:name>')
api.add_resource(categoryList, '/categorys')
api.add_resource(Item, '/item/<string:name>')
api.add_resource(ItemList, '/items')
'''api.add_resource(UserRegister, '/register')'''

if __name__ == '__main__':
    db.init_app(app)
    app.run(port=5000, debug=True)
