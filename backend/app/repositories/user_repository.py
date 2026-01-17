from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.user import User
from uuid import UUID

class UserRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_email(self, email: str) -> User | None:
        """Find a user by email address."""
        # SQLAlchemy 2.0 style: use select() instead of query()
        result = await self.db.execute(select(User).where(User.email == email))
        return result.scalar_one_or_none()

    async def get_by_id(self, user_id: UUID) -> User | None:
        """Find a user by id."""
        result = await self.db.execute(select(User).where(User.id == user_id))
        return result.scalar_one_or_none()

    async def create(self, user_obj: User) -> User:
        """Save a new user to the database."""
        self.db.add(user_obj)
        await self.db.commit()
        await self.db.refresh(user_obj)
        return user_obj
