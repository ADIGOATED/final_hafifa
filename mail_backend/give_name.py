def message_to_dict(obj) -> dict:
    data: dict = dict(obj.to_mongo())  # Converts to dict
    data["id"] = str(data.pop("_id"))  # Rename `_id` to `id` and convert ObjectId to string

    if hasattr(obj, 'sender') and obj.sender is not None:
        data["sender"] = str(data.pop("sender"))

    if hasattr(obj, 'recipient') and obj.recipient is not None:
        data["recipient"] = str(data.pop("recipient"))

    return data


def serialize_user(user):
    return {
        # "id": str(user.id),
        "fname": user.fname,
        "lname": user.lname,
        "mail": user.mail,
        # "password": user.password
    }
