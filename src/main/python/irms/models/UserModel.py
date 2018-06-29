from ..main import db


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String)
    password = db.Column(db.String)
    email = db.Column(db.String)
    createdate = db.Column(db.DateTime)
    creator_id = db.Column(db.Integer)
    creator = db.Column(db.String)

    def __repr__(self):
        return '<User >'
