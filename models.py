class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(200), unique=True, nullable=False)
    email = db.Column(db.String(200), unique=True, nullable=False)
    hash = db.Column(db.String(200), nullable=False)

    def __str__(self):
        return "<User %r>" % self.username
