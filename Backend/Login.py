from fastapi import APIRouter, HTTPException
from Model.Login import Login
from Database.Database import db_dependent
from Database.Database import session,engine
from sqlalchemy import text
from Backend.Signup import password_content

router = APIRouter()

@router.post('/login')
async def login(login: Login, db:db_dependent):
    username = login.username
    password = login.password
    
    query = text(f"SELECT * FROM \"Users\" WHERE \"UserName\" = \'{username}\'")
    connection = engine.connect()
    user = connection.execute(query).fetchone()
    
    if not user:
        return HTTPException(status_code=404, detail="User Not Found")

    check_pass = password_content.verify(password, user.Password)
    
    if check_pass:
        return HTTPException(status_code=204, detail="Login Successfully")
    else:
        return HTTPException(status_code=404, detail="Password is Incorrect")