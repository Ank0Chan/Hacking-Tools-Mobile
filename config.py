import os
from dotenv import load_dotenv


load_dotenv()

def get_api_key():
    return os.getenv("API_KEY")

def get_host():
    return os.getenv("HOST")

def get_port():
    return int(os.getenv("PORT"))

def get_admin_password_hash():
    return os.getenv("ADMIN_PASSWORD_HASH")

def get_admin_password_salt():
    return os.getenv("ADMIN_PASSWORD_SALT")

def get_debug():
    return bool(os.getenv("DEBUG")).lower() == "true"



