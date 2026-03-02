from pydantic import BaseModel, EmailStr
from datetime import date

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: str
    gender: str
    role: str
    phone: str | None = None
    address: str | None = None
    date_of_birth: date | None = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str

class dataInput(BaseModel):
    num1:float
    num2:float

