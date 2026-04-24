from pydantic import BaseModel, Field, SecretStr
from typing import Annotated

class Login(BaseModel):
    username: Annotated[str, Field(..., min_length=5 , max_length=10, pattern="^[a-zA-Z0-9]+$")]
    password: Annotated[str, Field(..., max_length=20)]