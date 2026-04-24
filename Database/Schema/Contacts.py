from sqlalchemy import Integer, Column, String
from ..Database import Base, engine
 
class Contacts(Base):
    __tablename__ = "Contacts"
 
    ID             = Column(Integer, primary_key=True, index=True)
    owner_UserName = Column(String, nullable=False)
    contact_name   = Column(String, nullable=False)
 
Base.metadata.create_all(bind=engine)