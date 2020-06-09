from db import db

class categoryModel(db.Model):
    __tablename__ = 'categorys'

     # model will these 2 columns - tells SQLAlchemy how to read these tables
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))

    items = db.relationship('ItemModel', lazy='dynamic') # lazy --> create a new object for each item until the end (save resources)

    #name, info and category_id will be passed into here from tablename above
    def __init__(self, name):
        self.name = name

    def json(self):
        return {'name': self.name, 'items': [item.json() for item in self.items.all()]}
        #.all because we use the lazy=dynamic function (Udemy 110)
        #looks in table whenever we call json method

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()  #.query is from db.Model (SQLALchemy)

    def save_to_db(self):  #insert method
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):  #delete method
        db.session.delete(self)
        db.session.commit()
