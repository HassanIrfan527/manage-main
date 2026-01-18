from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app import schemas, database
from app.services.user_service import UserService
from app.repositories.user_repository import UserRepository
from app.utils import create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])

# Dependency to get UserService with database session
async def get_user_service(db: AsyncSession = Depends(database.get_db)):
    repo = UserRepository(db)
    return UserService(repo)


@router.post("/register", response_model=schemas.AuthResponse, status_code=201)
async def register(
    user: schemas.UserCreate,
    user_service: UserService = Depends(get_user_service)
):
    """Register a new user account."""
    new_user = await user_service.register_user(user)
    if not new_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    token_data = {"sub": str(new_user.id), "email": new_user.email}
    token = await create_access_token(data=token_data)
    
    return {
        "user": new_user, 
        "access_token": token, 
        "token_type": "bearer"
    }
    
@router.post("/login", response_model=schemas.AuthResponse)
async def login(
    user: schemas.UserBase,
    user_service: UserService = Depends(get_user_service)
):
    """Login the user."""
    logged_in_user = await user_service.login_user(user)
    if not logged_in_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    token_data = {"sub": str(logged_in_user.id), "email": logged_in_user.email}
    token = await create_access_token(data=token_data)
    
    return {
        "user": logged_in_user, 
        "access_token": token, 
        "token_type": "bearer"
    }