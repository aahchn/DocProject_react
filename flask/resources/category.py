from flask_restful import Resource
from models.category import categoryModel

class category(Resource):
    def get(self, name):
        category = categoryModel.find_by_name(name)
        if category:
            return category.json()
        return {'message': 'category not found'}, 404

    def post(self, name):
        if categoryModel.find_by_name(name):
            return {'message': "A category with name '{}' already exists.".format(name)}, 400

        category = categoryModel(name)
        try:
            category.save_to_db()
        except:
            return {"message": "An error occurred creating the category."}, 500

        return category.json(), 201

    def delete(self, name):
        category = categoryModel.find_by_name(name)
        if category:
            category.delete_from_db()

        return {'message': 'category deleted'}


class categoryList(Resource):
    def get(self):
        return {'categorys': list(map(lambda x: x.json(), categoryModel.query.all()))}
        #can also be return {'categorys': [category.json() for category in categoryModel.query.all()]}
