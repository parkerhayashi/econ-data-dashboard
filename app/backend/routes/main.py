from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from . import data, sectors
app.include_router(data.router)
app.include_router(sectors.router)

@app.get('/')
def root():
    return {"message": "Welcome to the Economic Dashboard"}