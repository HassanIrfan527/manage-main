from pydantic import BaseModel, EmailStr
from datetime import datetime
from uuid import UUID


class UserBase(BaseModel):
    name: str
    email: EmailStr


# For Login endpoint
class UserLogin(BaseModel):
    email: EmailStr
    password: str
class UserCreate(UserBase):
    password: str  # Only add password - name and email come from UserBase

class UserUpdate(BaseModel):
    name: str | None = None
    email: EmailStr | None = None
    password: str | None = None


class User(UserBase):
    id: UUID
    created_at: datetime
    updated_at: datetime
    access_token: str | None = None
    token_type: str | None = None
    
    class Config:
        from_attributes = True


# Alias for API responses - excludes password, used for login and register
class AuthResponse(BaseModel):
    user: User
    access_token: str
    token_type: str = "bearer"