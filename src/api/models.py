from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def __init__(self, email, password, is_active):
        self.email = email
        self.password = password
        self.is_active = is_active

    @classmethod
    def new_registro_user(cls, email, password, is_active):
        new_registro_user = cls(email, password, is_active)
        db.session.add(new_registro_user)
        try:
            db.session.commit()
            return new_registro_user
        except Exception as error:
            print(error)
            return None

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "password": self.password,
            # do not serialize the password, its a security breach
        }