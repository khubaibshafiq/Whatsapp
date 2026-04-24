from fastapi import APIRouter
from Database.Database import db_dependent
from Model.ChatRequest import ChatRequest
from sqlalchemy import text

router = APIRouter()

@router.post('/chat')
async def main(username: ChatRequest, db: db_dependent):

    query = text("""
        SELECT c.contact_name
        FROM \"contacts\" AS c
        LEFT JOIN "Users" AS u ON u."UserName" = c.owner_UserName
        WHERE u."UserName" = :username
    """)

    rows = db.execute(query, {"username": username.username}).fetchall()
    return [row._asdict() for row in rows]