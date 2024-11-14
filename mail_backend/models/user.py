from mongoengine import (Document, StringField)
from pydantic import BaseModel, EmailStr, Field


# mongoengine
class User(Document):
    fname = StringField(required=True, max_length=60)
    lname = StringField(required=True, max_length=60)
    mail = StringField(required=True, max_length=60, unique=True)
    password = StringField(required=True, min_length=4, max_length=60)

    meta = {
        'collection': 'User'
    }


# fastapi

class ApiUser(BaseModel):
    fname: str
    lname: str
    mail: str  # EmailStr
    password: str


class ApiSignIn(BaseModel):
    mail: str  # EmailStr
    password: str


class ApiSignUp(BaseModel):
    mail: str  # EmailStr
    password: str
    fname: str
    lname: str
