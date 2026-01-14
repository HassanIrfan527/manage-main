from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app import schemas, database
from app.services.user_service import UserService
from app.repositories.user_repository import UserRepository

router = APIRouter(prefix="/auth", tags=["auth"])


# Dependency to get UserService with database session
async def get_user_service(db: AsyncSession = Depends(database.get_db)):
    repo = UserRepository(db)
    return UserService(repo)


@router.post("/register", response_model=schemas.UserOut, status_code=201)
async def register(
    user: schemas.UserCreate,
    user_service: UserService = Depends(get_user_service)
):
    """Register a new user account."""
    new_user = await user_service.register_user(user)
    if not new_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return new_user
