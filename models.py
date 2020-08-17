from sqlalchemy import create_engine, Column, Integer, ForeignKey, String
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql.sqltypes import TIMESTAMP

engine = create_engine("sqlite:///test.db",
                       echo=True,
                       connect_args={'check_same_thread': False})
Base = declarative_base()
Base.metadata.bind = engine

Session = sessionmaker(bind=engine)
db = Session()


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String)
    email = Column(String)
    hash = Column(String)
    notes = relationship("Note", back_populates='users')

    def __repr__(self):
        return "<User(username='%s', email='%s')>" % (self.username,
                                                      self.email)


class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String(200))
    content = Column(String)
    tag = Column(String(40))
    timestamp = Column(TIMESTAMP)

    users = relationship("User", back_populates="notes")

    def __repr__(self):
        return "<Note(user_id='%s', content='%s')>" % (self.user_id,
                                                       self.content)


if __name__ == "__main__":
    Base.metadata.create_all(engine)