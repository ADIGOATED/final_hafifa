import json
from fastapi import FastAPI, HTTPException
from mongoengine import DoesNotExist
from give_name import message_to_dict, serialize_user
from mongo_connection import connect_to_mongo
from models.message import Message, ApiMessage
from uuid import UUID

app = FastAPI()
connect_to_mongo()


@app.get('/')
def stam():
    return 'works'


# message section #


@app.get('/message/preview/{message_id}')
def get_message_preview(message_id: str):
    try:
        message = Message.objects(id=message_id).only("text", "title", "sender").first()

        if message is None:
            raise DoesNotExist

        response_message = message_to_dict(message)
        response_message['createdAt'] = message.id.generation_time
        response_message["sender"] = serialize_user(message.sender)

        return response_message
    except DoesNotExist:
        return f'no message with id: {message_id}'


@app.get('/message/{message_id}')
def get_full_message_by_id(message_id: str):
    try:
        message = Message.objects(id=message_id).first()
        response_message = message_to_dict(message)

        if message is None:
            raise DoesNotExist

        response_message["sender"] = serialize_user(message.sender)
        response_message["recipient"] = serialize_user(message.recipient)

        return response_message


    except Exception as e:
        return e

# @app.get('/message/{message_id}')
# def get_message_preview_by_id(message_id: int):
#     return message_id


# @app.get('/parent/{message_id}')
# def get_parent(message_id: str):
#     try:
#         message = Message.objects.get(title=message_id)
#         good = to_dict(message)
#         good["createdAt"] = message.id.generation_time
#         return good
#     except DoesNotExist:
#         raise HTTPException(status_code=404, detail="Parent not found")
