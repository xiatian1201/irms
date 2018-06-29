from flask import Flask
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from .api import bp_api

app = Flask()
api = Api()
db = SQLAlchemy()


def create_app():
    app.__init__(__name__)
    app.register_blueprint(bp_api)
    api.init_app(app)
    db.init_app(app)
