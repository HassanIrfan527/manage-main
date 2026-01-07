from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import create_db_tables, get_db
from sqlalchemy.ext.asyncio import AsyncSession
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Ensure models are imported so SQLAlchemy knows about them
    import app.models  # registers ORM models on Base

    # Startup: create database tables
    await create_db_tables()
    yield
    # Shutdown: any cleanup can be done here
app = FastAPI(lifespan=lifespan)

# Allow React to talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Inventory API is running"}
