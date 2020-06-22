from db import db

class ItemModel(db.Model):
    __tablename__ = 'items'

     # model will these 3 columns - tells SQLAlchemy how to read these tables
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80))
    info = db.Column(db.String(1000))

    category_id = db.Column(db.Integer, db.ForeignKey('categorys.id')) # TODO - change to category
    category = db.relationship('categoryModel')  # TODO - change to category

    #name, info and category_id will be passed into here from tablename above
    def __init__(self, name, info, category_id):
        self.name = name
        self.info = info
        self.category_id = category_id

    def json(self):
        return {'name': self.name, 'info': self.info, 'category_id': self.category_id, 'id': self.id}

    @classmethod
    def find_by_name(cls, name):
        return cls.query.filter_by(name=name).first()  #.query is from db.Model (SQLALchemy)
        # same as SELECT * FROM items WHERE name = name LIMIT 1 (return only the first result)

    @classmethod
    def find_by_id(cls, id):
        return cls.query.filter_by(id=id).first()

    def save_to_db(self):  #insert method
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):  #delete method
        db.session.delete(self)
        db.session.commit()
