from fastapi import FastAPI
from app.routers import auth, dashboard
from fastapi.middleware.cors import CORSMiddleware
from app.database import create_db_tables, get_db
from sqlalchemy.ext.asyncio import AsyncSession
from contextlib import asynccontextmanager
from fastapi.security import OAuth2PasswordBearer
import logging


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Ensure models are imported so SQLAlchemy knows about them
    import app.models  # registers ORM models on Base

    # Startup: create database tables
    await create_db_tables()
    yield
    # Shutdown: any cleanup can be done here


app = FastAPI(lifespan=lifespan)


# 1. Configure the logging settings
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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


app.include_router(auth.router)
app.include_router(dashboard.router)
