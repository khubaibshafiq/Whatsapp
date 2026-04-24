from sqlalchemy import Integer, Column, String
from ..Database import Base
from ..Database import engine

class Users(Base):
    __tablename__ = "Users"
    
    ID = Column(Integer, primary_key=True, index=True)
    UserName = Column(String, nullable=False, unique=True)
    Password = Column(String)
    
Base.metadata.create_all(bind=engine)