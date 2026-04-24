from pydantic import BaseModel

class Contact(BaseModel):
    username: str
    contact_name: str