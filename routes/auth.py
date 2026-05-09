from fastapi import APIRouter, Response
from pydantic import BaseModel
from config import get_admin_password_hash, get_admin_password_salt
from auth.hash import verify_password

router = APIRouter()

class LoginRequest(BaseModel):
    password: str

@router.post("/login")
async def login(requests: LoginRequest):
    if verify_password(requests.password, get_admin_password_hash(), get_admin_password_salt()):
        from config import get_api_key
        response = Response(content="Login Success", status_code=200)
        response.headers["X-API-Key"] = get_api_key()
        return response
    return Response(content="Invalid password", status_code=401)
