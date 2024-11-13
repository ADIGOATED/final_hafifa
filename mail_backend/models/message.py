from pydantic import BaseModel, EmailStr
from uuid import UUID
from mongoengine import (Document, StringField, ReferenceField, BooleanField)
from .user import User



# mongoengine
class Message(Document):
    text = StringField(required=True, max_length=5000)
    title = StringField(required=True, max_length=60)
    sender = ReferenceField(User, required=True)
    recipient = ReferenceField(User, required=True)
    read = BooleanField(default=False)

    meta = {
        'collection': 'Message'
    }


# fastapi
class ApiMessage(BaseModel):
    text: str
    title: str
    sender: str #UUID
    recipient: str #EmailStr
    read: bool

