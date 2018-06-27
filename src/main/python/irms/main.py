from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from .api import bp_api

app = Flask(__name__)
api = Api(bp_api)

app.register_blueprint(bp_api)
