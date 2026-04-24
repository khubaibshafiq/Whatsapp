from fastapi import APIRouter, HTTPException
from sqlalchemy import text
from Database.Database import db_dependent
from Model.Contact import Contact

router = APIRouter()

@router.post("/contact")
def add_contact(data: Contact, db: db_dependent):

    query = text('SELECT * FROM "Users" WHERE "UserName" = :username')
    result = db.execute(query, {"username": data.username}).fetchone()

    if not result:
        raise HTTPException(status_code=404, detail="User not found")

    check = text("""
        SELECT * FROM \"contacts\"
        WHERE owner_UserName = :owner AND contact_name = :contact
    """)
    existing = db.execute(check, {
        "owner": data.username,
        "contact": data.contact_name
    }).fetchone()

    if existing:
        return {"message": "Already in contacts"}

    insert = text("""
        INSERT INTO \"Contacts\" (owner_UserName, contact_name)
        VALUES (:owner, :contact)
    """)

    db.execute(insert, {"owner": data.username,       "contact": data.contact_name})
    db.execute(insert, {"owner": data.contact_name,   "contact": data.username})
    db.commit()

    return {"message": "Contact added successfully"}