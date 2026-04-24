from sqlalchemy.orm import sessionmaker, Session
from fastapi import Depends
from typing import Annotated
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
import os

URL_DATABASE = os.getenv('URL_DATABASE')

engine = create_engine(URL_DATABASE)

session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = session()
    try: 
        yield db  #yeh hold krta hai database ko request pr 
    finally:
        db.close()      

db_dependent = Annotated[Session, Depends(get_db)]