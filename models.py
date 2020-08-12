from sqlalchemy import create_engine, Column, Integer, ForeignKey, String
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine("sqlite:///test.db", echo=True)
Base = declarative_base()
Base.metadata.bind = engine

Session = sessionmaker(bind=engine)
session = Session()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)
    hash = Column(String)

    def __repr__(self):
        return "<User(name='%s', email='%s')>" %s (self.name, self.email) 

class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    content = Column(String)

    user = relationship("User", back_populates="notes")

    def __repr__(self):
        return "<Note(user_id='%s', content='%s')>" %s (self.user_id, self.content)