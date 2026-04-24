from fastapi import APIRouter, HTTPException
from Model.Signup import Signup
from passlib.context import CryptContext
from Database.Database import db_dependent
from Database.Schema.Users import Users

router = APIRouter()

#activate kr rhe hain hashing password
password_content = CryptContext(schemes=["argon2"], deprecated ="auto")  #deprecated did like when the hashing system change it easily shift from bcrypt to other session

@router.post('/signup')
async def signup(signup: Signup, db:db_dependent):
    
    try:
        hashing_password = password_content.hash(signup.password.get_secret_value())
        db_users = Users(
            UserName = signup.username,
            Password = hashing_password
        )
        db.add(db_users)
        db.commit()
        db.refresh(db_users)
        return {"message": "User successfully created"}
    except:
        raise HTTPException(status_code=500)