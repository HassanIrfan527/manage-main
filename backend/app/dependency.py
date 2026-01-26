from fastapi import Depends
from app.services.user_service import UserService, oauth2_scheme
from app.repositories.user_repository import UserRepository
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.user import User
from app import database


async def get_user_service(db: AsyncSession = Depends(database.get_db)) -> UserService:
    """Dependency to get UserService with database session."""
    repo = UserRepository(db)
    return UserService(repo)


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    user_service: UserService = Depends(get_user_service),
) -> User:
    """Dependency that verifies token and returns the current user."""
    return await user_service.verify_user(token)
