from fastapi import APIRouter
from sqlalchemy import text
from Database.Database import db_dependent
import Database.Schema.Messages
from Database.Database import engine

router = APIRouter()

Database.Schema.Messages.Base.metadata.create_all(bind=engine)

@router.post("/messages")
async def get_messages(data: dict, db: db_dependent):
    user1 = data.get("user1")
    user2 = data.get("user2")

    query = text("""
        SELECT * FROM \"Messages\"
        WHERE 
        (sender = :u1 AND receiver = :u2)
        OR
        (sender = :u2 AND receiver = :u1)
        ORDER BY time ASC
    """)

    result = db.execute(query, {"u1": user1,"u2": user2})

    messages = []
    for row in result:
        messages.append(dict(row._mapping))
    return messages