from fastapi import FastAPI, Response
from config import get_host, get_port
from auth.middleware import verify_api_key
from routes.auth import router as auth_router
from routes.scan import router as nmap_router

app = FastAPI()

@app.get("/")
async def root():
    return {"status": "ok"}

@app.middleware("http")
async def auth_middleware(request, call_next):
    if request.url.path == "/login":
        return await call_next(request)
    if not await verify_api_key(request):
        return Response(content="Unauthorized", status_code=401)
    return await call_next(request)

app.include_router(auth_router)

app.include_router(nmap_router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=get_host(), port=get_port())