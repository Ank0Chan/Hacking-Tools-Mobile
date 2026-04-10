import hashlib, os

def generate_hash(password):
    salt = os.urandom(16)
    password_hash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'), salt, 100000)
    return salt.hex(), password_hash.hex()

def verify_password(password, stored_hash, stored_salt):
    
    if hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'), bytes.fromhex(stored_salt), 100000) == bytes.fromhex(stored_hash):
        return True
    
    return False