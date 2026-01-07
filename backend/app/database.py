from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from typing import AsyncGenerator
from sqlalchemy.orm import declarative_base

# Use the async SQLite driver
SQLALCHEMY_DATABASE_URL = "sqlite+aiosqlite:///./inventory.db"

# Async engine
engine = create_async_engine(SQLALCHEMY_DATABASE_URL, echo=False)

# Async session factory
SessionLocal = async_sessionmaker(bind=engine, expire_on_commit=False, autoflush=False)

# Base class for ORM models
Base = declarative_base()


async def create_db_tables():
    """Creates the database tables defined on `Base` subclasses."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """Dependency that provides a database session."""
    async with SessionLocal() as session:
        yield session