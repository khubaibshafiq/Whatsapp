from sqlalchemy import Integer, Column, String, DateTime
from sqlalchemy.sql import func
from ..Database import Base, engine

class Messages(Base):
    __tablename__ = "Messages"

    ID           = Column(Integer, primary_key=True, index=True)
    sender       = Column(String, nullable=False)
    receiver     = Column(String, nullable=False)
    message_text = Column(String)
    time         = Column(DateTime(timezone=True), server_default=func.now())

Base.metadata.create_all(bind=engine)