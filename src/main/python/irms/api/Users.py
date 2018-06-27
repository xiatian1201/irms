from flask import Blueprint
from flask_resetful import Resource, fields, marshal_with


user_fields = {
	'id': fields.Integer,
	'username': fields.String,
	'name': fields.String
	'email': fields.String
	'status': fields.Integer
	'createtime': fields.DataTime(dt_format='iso8601')
	'creator_id': fields.Integer
	'creator': fields.String
}


class User(Resource):
	@marshal_with(user_fields, envelope='resource')
	def get(self, user_id):
		user = UserController.query.get(user_id).one_or_none()
		if user is None:
			return 404
		else
			return user, 200
	def post(self):
		

