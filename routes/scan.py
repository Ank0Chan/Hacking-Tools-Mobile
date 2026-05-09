from fastapi import APIRouter, Response
from pydantic import BaseModel
from services.nmap import host_search

router = APIRouter()

class NmapRequest(BaseModel):
    ip_address: str

@router.post("/nmap")
async def nmap(requests: NmapRequest):
    result = host_search(requests.ip_address)
    if result:
        return Response(content=result, status_code=200)
    return Response(content='Invalid Address', status_code=400)