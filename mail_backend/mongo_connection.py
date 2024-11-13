from mongoengine import connect


def connect_to_mongo():
    connect(
        db='mail',
        host='127.0.0.1',
        # host='celery-mongodb',
        port=27017
    )
