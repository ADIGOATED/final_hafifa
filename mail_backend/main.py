import json
import time

from bson import ObjectId
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from mongoengine.errors import NotUniqueError
from give_name import message_to_dict, serialize_user
from mongo_connection import connect_to_mongo
from models.message import Message, ApiMessage
from uuid import UUID
from models.user import User, ApiSignIn, ApiSignUp

app = FastAPI()
connect_to_mongo()

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def default_exception(e):
    raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@app.get('/')
def stam():
    return 'works'


# message section #


# @app.get('/message/preview/{message_id}', status_code=status.HTTP_200_OK)
# def get_message_preview(message_id: str):
#     try:
#         message = Message.objects(id=message_id).only("text", "title", "sender", "read").first()
#
#         if message is None:
#             raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'no message with id: {message_id}')
#
#         response_message = message_to_dict(message)
#         response_message['createdAt'] = message.id.generation_time
#         response_message["sender"] = serialize_user(message.sender)
#
#         return response_message
#
#     except Exception as e:
#         default_exception(e)


@app.post('/message/post')
def new_message(message_details: ApiMessage):
    try:
        message = Message(text=message_details.text, title=message_details.text,
                          sender=ObjectId(message_details.sender),
                          recipient=ObjectId(message_details.recipient), read=False)
        message.save()

        return f'saved user with email {message_details.sender}'
    except Exception as e:
        default_exception(e)


@app.get('/message/inbox/{user_id}', status_code=status.HTTP_200_OK)
def all_inbox_preview(user_id: str):
    try:
        messages = Message.objects.filter(recipient=user_id).only("text", "title", "sender", "read")
        lst = []

        for message in messages:
            mess = message_to_dict(message)
            mess["sender"] = serialize_user(message.sender)
            mess['createdAt'] = message.id.generation_time
            lst.append(mess)

        return lst

    except Exception as e:
        default_exception(e)


@app.get('/message/outbox/{user_id}', status_code=status.HTTP_200_OK)
def all_outbox_preview(user_id: str):
    try:
        messages = Message.objects.filter(sender=user_id).only("text", "title", "recipient", "read")
        lst = []

        for message in messages:
            mess = message_to_dict(message)
            mess["recipient"] = serialize_user(message.recipient)
            lst.append(mess)

        return lst

    except Exception as e:
        default_exception(e)


@app.get('/message/{message_id}', status_code=status.HTTP_200_OK)
def get_full_message(message_id: str):
    try:
        message = Message.objects(id=message_id).first()
        response_message = message_to_dict(message)

        if message is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'no message with id: {message_id}')

        response_message["sender"] = serialize_user(message.sender)
        response_message["recipient"] = serialize_user(message.recipient)

        return response_message

    except Exception as e:
        default_exception(e)


@app.patch('/message/read/{message_id}', status_code=status.HTTP_200_OK)
def read_message(message_id: str):
    try:
        message = Message.objects(id=message_id).first()

        if message is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'no message with id: {message_id}')

        message.update(read=True)

    except Exception as e:
        default_exception(e)


# user section

@app.post('/user/signin')
def sign_in(sign_in_details: ApiSignIn):
    print(sign_in_details.mail)

    try:
        user = User.objects(password=sign_in_details.password, mail=sign_in_details.mail).first()
        print(user)
        if user is None:
            print("good")
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail=f'no user with mail:{sign_in_details.mail}')

        response_user = message_to_dict(user)
        response_user['authorize'] = True


        return response_user

    except Exception as e:
        if e.status_code == 404:
            raise e

        raise default_exception(e)


@app.post('/user/signup', status_code=status.HTTP_201_CREATED)
def sign_in(sign_up_details: ApiSignUp):
    try:
        new_user = User(fname=sign_up_details.fname, lname=sign_up_details.lname, mail=sign_up_details.mail,
                        password=sign_up_details.password)
        new_user.save()

        response_user = message_to_dict(new_user)
        response_user['authorize'] = True

        return response_user

    except NotUniqueError as e:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(e))

    except Exception as e:
        default_exception(e)
