import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from config import get_api_key

async def verify_api_key(request):
    user_api_key = request.headers.get("X-API-Key")
    if user_api_key and user_api_key == get_api_key():
        return True
    return False